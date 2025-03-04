"use client";
import { IMedicine, medicineCategoryOptions } from "@/types";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import { Check, ChevronsUpDown, Search, SlidersHorizontal } from "lucide-react";
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
import { useInView } from "react-intersection-observer";

type SortOption = {
  field: "price" | "name" | "stock" | "createdAt";
  order: "asc" | "desc";
} | null;

export default function AllMedicines({ data }: { data: IMedicine[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [prescriptionRequired, setPrescriptionRequired] = useState<
    boolean | null
  >(null);
  const [sortOption, setSortOption] = useState<SortOption>(null);
  const [page, setPage] = useState(1);
  const [displayedMedicines, setDisplayedMedicines] = useState<IMedicine[]>([]);
  const ITEMS_PER_PAGE = 8;

  const { ref, inView } = useInView();

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
  }, [data, searchTerm, minPrice, maxPrice, selectedCategory, prescriptionRequired, sortOption]);

  useEffect(() => {
    const start = 0;
    const end = page * ITEMS_PER_PAGE;
    setDisplayedMedicines(filteredResults.slice(start, end));
  }, [page, filteredResults]);
  
  useEffect(() => {
    if (inView && displayedMedicines.length < filteredResults.length) {
      setPage((prev) => prev + 1);
    }
  }, [inView, filteredResults.length, displayedMedicines.length]);

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
            onChange={(e) => setSearchTerm(e.target.value)}
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
                              onSelect={() => setSelectedCategory("all")}
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
                                  setSelectedCategory(category.value)
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
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                    />
                    <Input
                      type="number"
                      placeholder="Max price"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
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
                      onCheckedChange={(checked) => {
                        setPrescriptionRequired(checked ? true : null);
                      }}
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
                          onSelect={() => setSelectedCategory("all")}
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
                            onSelect={() => setSelectedCategory(category.value)}
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
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                />
                <Input
                  type="number"
                  placeholder="Max price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
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
                  onCheckedChange={(checked) => {
                    setPrescriptionRequired(checked ? true : null);
                  }}
                />
                <label htmlFor="prescription">Prescription Required</label>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="flex-1">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(275px,100%),1fr))] gap-4">
            {displayedMedicines.map((medicine) => (
              <MedicineCard key={medicine._id} medicine={medicine} />
            ))}
          </div>

          {/* Intersection Observer Target */}
          {displayedMedicines.length < filteredResults.length && (
            <div ref={ref} className="w-full py-8 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}

          {filteredResults.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold">No medicines found</h2>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
