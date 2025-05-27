"use client";
import { IMedicine, medicineCategoryOptions } from "@/types";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import { Check, ChevronsUpDown, Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import MedicineCard from "./MedicineCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useRouter, useSearchParams } from "next/navigation";

type SortOption = {
  field: "price" | "name" | "stock" | "createdAt";
  order: "asc" | "desc";
} | null;

const updateURL = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  router: any,
  searchParams: URLSearchParams,
  key: string,
  value: string
) => {
  const params = new URLSearchParams(searchParams);
  if (value && value !== "all") {
    params.set(key, value);
  } else {
    params.delete(key);
  }
  const queryString = params.toString();
  const newURL = queryString ? `/shop?${queryString}` : '/shop';
  router.push(newURL, { scroll: false });
};

// Pagination Component
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {getVisiblePages().map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <span className="px-3 py-2 text-muted-foreground">...</span>
            ) : (
              <Button
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page as number)}
                className="min-w-[40px]"
              >
                {page}
              </Button>
            )}
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

// Items per page selector
const ItemsPerPageSelector = ({
  itemsPerPage,
  onItemsPerPageChange,
}: {
  itemsPerPage: number;
  onItemsPerPageChange: (items: number) => void;
}) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Show:</span>
      <Select
        value={itemsPerPage.toString()}
        onValueChange={(value) => onItemsPerPageChange(Number(value))}
      >
        <SelectTrigger className="w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="8">8</SelectItem>
          <SelectItem value="12">12</SelectItem>
          <SelectItem value="16">16</SelectItem>
          <SelectItem value="24">24</SelectItem>
          <SelectItem value="32">32</SelectItem>
        </SelectContent>
      </Select>
      <span className="text-sm text-muted-foreground">per page</span>
    </div>
  );
};

export default function AllMedicines({ data }: { data: IMedicine[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("categories") || "all"
  );
  const [prescriptionRequired, setPrescriptionRequired] = useState<
    boolean | null
  >(null);
  const [sortOption, setSortOption] = useState<SortOption>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const categories = searchParams.get("categories");
    const search = searchParams.get("search");
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const prescriptionParam = searchParams.get("prescription");
    const pageParam = searchParams.get("page");

    if (categories) {
      setSelectedCategory(categories);
    }
    if (search) {
      setSearchTerm(search);
    }
    if (minPriceParam) {
      setMinPrice(Number(minPriceParam));
    }
    if (maxPriceParam) {
      setMaxPrice(Number(maxPriceParam));
    }
    if (prescriptionParam) {
      setPrescriptionRequired(
        prescriptionParam === "true"
          ? true
          : prescriptionParam === "false"
          ? false
          : null
      );
    }
    if (pageParam) {
      setCurrentPage(Number(pageParam));
    }
  }, [searchParams]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
    updateURL(router, searchParams, "search", value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1); // Reset to first page when filtering
    updateURL(router, searchParams, "categories", value);
  };

  const handleMinPriceChange = (value: number) => {
    setMinPrice(value);
    setCurrentPage(1); // Reset to first page when filtering
    updateURL(router, searchParams, "minPrice", value.toString());
  };

  const handleMaxPriceChange = (value: number) => {
    setMaxPrice(value);
    setCurrentPage(1); // Reset to first page when filtering
    updateURL(router, searchParams, "maxPrice", value.toString());
  };

  const handlePrescriptionChange = (checked: boolean) => {
    const newValue = checked ? true : null;
    setPrescriptionRequired(newValue);
    setCurrentPage(1); // Reset to first page when filtering
    updateURL(
      router,
      searchParams,
      "prescription",
      newValue === true ? "true" : ""
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURL(router, searchParams, "page", page.toString());
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page when changing items per page
    updateURL(router, searchParams, "page", "1");
  };

  const filteredResults = useMemo(() => {
    return data
      .filter((medicine) => {
        const searchString = (
          medicine.name +
          medicine.description +
          medicine.category
        ).toLowerCase();
        const matchesSearch = searchString.includes(searchTerm.toLowerCase());
        const matchesMinPrice = minPrice ? medicine.price >= minPrice : true;
        const matchesMaxPrice = maxPrice ? medicine.price <= maxPrice : true;
        const matchesCategory =
          selectedCategory === "all"
            ? true
            : medicine.category === selectedCategory;
        const matchesPrescription =
          prescriptionRequired !== null
            ? medicine.prescriptionRequired === prescriptionRequired
            : true;

        return (
          matchesSearch &&
          matchesMinPrice &&
          matchesMaxPrice &&
          matchesCategory &&
          matchesPrescription
        );
      })
      .sort((a, b) => {
        if (!sortOption) return 0;

        switch (sortOption.field) {
          case "price":
            return sortOption.order === "asc"
              ? a.price - b.price
              : b.price - a.price;
          case "name":
            return sortOption.order === "asc"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          case "stock":
            return sortOption.order === "asc"
              ? a.quantity - b.quantity
              : b.quantity - a.quantity;
          case "createdAt":
            return sortOption.order === "desc"
              ? new Date(b.createdAt as Date).getTime() -
                  new Date(a.createdAt as Date).getTime()
              : 0;
          default:
            return 0;
        }
      });
  }, [
    data,
    searchTerm,
    minPrice,
    maxPrice,
    selectedCategory,
    prescriptionRequired,
    sortOption,
  ]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMedicines = filteredResults.slice(startIndex, endIndex);

  // Results info
  const resultsInfo = {
    showing: currentMedicines.length,
    total: filteredResults.length,
    start: startIndex + 1,
    end: Math.min(endIndex, filteredResults.length),
  };

  return (
    <div className="py-8">
      {/* Search Bar at Top */}
      <h1 className="text-3xl font-bold md:hidden mb-10">
        Available Medicines
      </h1>
      <div className="flex justify-between items-center mb-10 gap-4">
        <h1 className="text-3xl font-bold md:block hidden">
          Available Medicines
        </h1>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search medicines..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            {/* Filter Content - same as desktop sidebar */}
            <div className="space-y-6 pt-6 px-2">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Category</h3>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !selectedCategory && "text-muted-foreground"
                        )}
                      >
                        {selectedCategory === "all"
                          ? "All Categories"
                          : medicineCategoryOptions.find(
                              (category) => category.value === selectedCategory
                            )?.label || "Select Category"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Category..." />
                        <CommandList>
                          <CommandEmpty>No Category found.</CommandEmpty>
                          <CommandGroup>
                            <CommandItem
                              value="All Categories"
                              onSelect={() => handleCategoryChange("all")}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedCategory === "all"
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              All Categories
                            </CommandItem>
                            {medicineCategoryOptions.map((category) => (
                              <CommandItem
                                value={category.label}
                                key={category.value}
                                onSelect={() =>
                                  handleCategoryChange(category.value)
                                }
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    category.value === selectedCategory
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {category.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <Input
                      type="number"
                      placeholder="Min price"
                      value={minPrice}
                      onChange={(e) =>
                        handleMinPriceChange(Number(e.target.value))
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Max price"
                      value={maxPrice}
                      onChange={(e) =>
                        handleMaxPriceChange(Number(e.target.value))
                      }
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Sort by</h3>
                  <Select
                    value={
                      sortOption
                        ? `${sortOption.field}-${sortOption.order}`
                        : "default"
                    }
                    onValueChange={(value) => {
                      if (value === "default") {
                        setSortOption(null);
                        return;
                      }
                      const [field, order] = value.split("-");
                      setSortOption({
                        field: field as
                          | "price"
                          | "name"
                          | "stock"
                          | "createdAt",
                        order: order as "asc" | "desc",
                      });
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="price-asc">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-desc">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="name-asc">Name: A to Z</SelectItem>
                      <SelectItem value="name-desc">Name: Z to A</SelectItem>
                      <SelectItem value="stock-asc">
                        Stock: Low to High
                      </SelectItem>
                      <SelectItem value="stock-desc">
                        Stock: High to Low
                      </SelectItem>
                      <SelectItem value="createdAt-desc">Latest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Prescription</h3>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="prescription"
                      checked={prescriptionRequired === true}
                      onCheckedChange={handlePrescriptionChange}
                    />
                    <label htmlFor="prescription">Prescription Required</label>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <Card className="w-64 p-4 h-fit sticky top-4 hidden md:block">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Category</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between",
                      !selectedCategory && "text-muted-foreground"
                    )}
                  >
                    {selectedCategory === "all"
                      ? "All Categories"
                      : medicineCategoryOptions.find(
                          (category) => category.value === selectedCategory
                        )?.label || "Select Category"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Category..." />
                    <CommandList>
                      <CommandEmpty>No Category found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          value="All Categories"
                          onSelect={() => handleCategoryChange("all")}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCategory === "all"
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          All Categories
                        </CommandItem>
                        {medicineCategoryOptions.map((category) => (
                          <CommandItem
                            value={category.label}
                            key={category.value}
                            onSelect={() => handleCategoryChange(category.value)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                category.value === selectedCategory
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {category.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="space-y-2">
                <Input
                  type="number"
                  placeholder="Min price"
                  value={minPrice}
                  onChange={(e) => handleMinPriceChange(Number(e.target.value))}
                />
                <Input
                  type="number"
                  placeholder="Max price"
                  value={maxPrice}
                  onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
                />
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Sort by</h3>
              <Select
                value={
                  sortOption
                    ? `${sortOption.field}-${sortOption.order}`
                    : "default"
                }
                onValueChange={(value) => {
                  if (value === "default") {
                    setSortOption(null);
                    return;
                  }
                  const [field, order] = value.split("-");
                  setSortOption({
                    field: field as "price" | "name" | "stock" | "createdAt",
                    order: order as "asc" | "desc",
                  });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                  <SelectItem value="stock-asc">Stock: Low to High</SelectItem>
                  <SelectItem value="stock-desc">Stock: High to Low</SelectItem>
                  <SelectItem value="createdAt-desc">Latest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Prescription</h3>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="prescription"
                  checked={prescriptionRequired === true}
                  onCheckedChange={handlePrescriptionChange}
                />
                <label htmlFor="prescription">Prescription Required</label>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="flex-1">
          {/* Results Info and Items Per Page Selector */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="text-sm text-muted-foreground">
              {filteredResults.length > 0 ? (
                <>
                  Showing {resultsInfo.start}-{resultsInfo.end} of{" "}
                  {resultsInfo.total} results
                </>
              ) : (
                "No results found"
              )}
            </div>
            <ItemsPerPageSelector
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>

          {/* Medicine Grid */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(275px,100%),1fr))] gap-4">
            {currentMedicines.map((medicine) => (
              <MedicineCard key={medicine._id} medicine={medicine} />
            ))}
          </div>

          {/* No Results Message */}
          {filteredResults.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold">No medicines found</h2>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

          {/* Results Summary */}
          {filteredResults.length > 0 && (
            <div className="text-center mt-6 text-sm text-muted-foreground">
              Page {currentPage} of {totalPages} • {filteredResults.length} total results
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
