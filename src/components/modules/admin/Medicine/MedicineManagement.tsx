"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { IMedicine } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2, Edit } from "lucide-react";
import { CustomModal } from "@/components/shared/CustomModal";
import EditMedicineForm from "@/components/forms/admin/EditMedicineForm";
import ConfirmationBox from "@/components/shared/ConfirmationBox";
import { deleteMedicine } from "@/services/medicines";
import { toast } from "sonner";
import CreateMedicineForm from "@/components/forms/admin/CreateMedicineForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function MedicineTable({
  medicines,
}: {
  medicines: IMedicine[];
}) {
  const [selectedMedicine, setSelectedMedicine] =
    React.useState<IMedicine | null>(null);
  const [open, setOpen] = React.useState(false);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [filterName, setFilterName] = React.useState("");
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 8,
  });

  const lastPageIndex = React.useRef(pagination.pageIndex);

  const handleDelete = async (id: string) => {
    const res = await deleteMedicine(id);
    if (res.success) {
      toast.success("Medicine deleted successfully");
    }
  };

  const handleView = (medicine: IMedicine) => {
    setSelectedMedicine(medicine);
    setOpen(true);
  };

  const columns: ColumnDef<IMedicine>[] = [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <Image
          src={row.original.image}
          alt={row.original.name}
          width={50}
          height={50}
          className="rounded w-auto h-auto object-cover"
        />
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => row.getValue("name"),
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <Badge variant="secondary">${row.getValue("price")}</Badge>
      ),
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <Badge variant="secondary">{row.getValue("quantity")}</Badge>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => row.getValue("category"),
    },
    {
      accessorKey: "prescriptionRequired",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prescription <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <Badge variant="secondary">
          {row.getValue("prescriptionRequired") ? "Required" : "Not Required"}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const medicine = row.original;
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleView(medicine)}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <CustomModal
              trigger={
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              }
              content={<EditMedicineForm initialData={medicine} />}
              title="Edit Medicine"
            />
            <ConfirmationBox
              trigger={
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              }
              onConfirm={() => handleDelete(medicine._id as string)}
              title="Are you sure?"
              description="This action cannot be undone."
            />
          </div>
        );
      },
    },
  ];

  const filteredData = React.useMemo(() => {
    return medicines.filter((item) =>
      item.name.toLowerCase().includes(filterName.toLowerCase())
    );
  }, [filterName, medicines]);
  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnVisibility,
      pagination,
    },
  });

  React.useEffect(() => {
    table.setPagination({
      pageIndex: lastPageIndex.current,
      pageSize: pagination.pageSize,
    });
  }, [medicines, pagination.pageSize, table]);
  
  React.useEffect(() => {
    lastPageIndex.current = pagination.pageIndex;
  }, [pagination.pageIndex]);


  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Medicines</h1>

        <CustomModal
          content={<CreateMedicineForm />}
          trigger={
            <Button className="h-8" effect={"shine"}>
              Add Medicine
            </Button>
          }
          title="Add Medicine"
        />
      </div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by name..."
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  checked={col.getIsVisible()}
                  onCheckedChange={(val) => col.toggleVisibility(val)}
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {medicines.length == 0 ? (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-2xl font-bold">No Medicines Found</h1>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      <div className="space-x-2 flex justify-center items-center mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[calc(100vh-4rem)] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedMedicine?.name}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Image
              src={selectedMedicine?.image as string}
              alt={selectedMedicine?.name as string}
              width={800}
              height={400}
              className="rounded cursor-pointer"
              priority
            />
            <div>
              <p className="font-semibold">Manufacturer Details:</p>
              <p>{selectedMedicine?.details}</p>
            </div>
            <div>
              <p className="font-semibold">Description:</p>
              <p className="whitespace-pre-wrap">
                {selectedMedicine?.description}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
