"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TOrder } from "@/types";
import { Eye, ArrowUpDown, ChevronDown } from "lucide-react";
import React, { useRef, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

export default function OrderHistoryManagement({ orders }: { orders: TOrder[] }) {
  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);
  const [open, setOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [filterValue, setFilterValue] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });
  const lastPageIndex = useRef(pagination.pageIndex);

  const handleView = (order: TOrder) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const columns: ColumnDef<TOrder>[] = [
    {
      accessorKey: "orderId",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order ID <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "totalPrice",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Price <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => `$${row.getValue("totalPrice")}`,
    },
    {
      accessorKey: "transactionId",
      header: "Transaction ID",
      cell: ({ row }) => (
        <Badge variant={"secondary"}>
          {row.original.transaction?.paymentId}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={
            ["Cancelled", "Failed"].includes(row.getValue("status"))
              ? "destructive"
              : "default"
          }
        >
          {row.getValue("status")}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const order = row.original;
        return (
          <Button variant="outline" size="sm" onClick={() => handleView(order)}>
            <Eye className="h-4 w-4" />
          </Button>
        );
      },
    },
  ];

  const filteredData = React.useMemo(() => {
    return orders.filter((order) =>
      order.orderId.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [filterValue, orders]);

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
  }, [pagination.pageSize, table]);

  React.useEffect(() => {
    lastPageIndex.current = pagination.pageIndex;
  }, [pagination.pageIndex]);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Payment Management</h1>
      </div>

      <div className="flex items-center py-4">
        <Input
          placeholder="Filter orders..."
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

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
            {table.getRowModel().rows?.length ? (
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
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {selectedOrder?.prescription && (
            <Image
              src={selectedOrder?.prescription}
              alt="Prescription"
              width={800}
              height={400}
              className="rounded"
            />
          )}
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Order ID</h3>
                <p>{selectedOrder?.orderId}</p>
              </div>
              <div>
                <h3 className="font-semibold">Status</h3>
                <Badge>{selectedOrder?.status}</Badge>
              </div>
              <div>
                <h3 className="font-semibold">Total Price</h3>
                <p>${selectedOrder?.totalPrice}</p>
              </div>
              <div>
                <h3 className="font-semibold">Shipping Address</h3>
                <p>
                  {selectedOrder?.address}, {selectedOrder?.city}
                </p>
              </div>
              {selectedOrder?.transaction && (
                <>
                  <div>
                    <h3 className="font-semibold">Payment Method</h3>
                    <p>{selectedOrder.transaction.method}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Transaction Status</h3>
                    <p>
                      {selectedOrder.transaction.transactionStatus || "Paid"}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Medicines Bought</h3>
            <ol>
              {selectedOrder?.medicines.map((medicine, index) => (
                <li key={index}>
                  {index+1}. {medicine.medicine.name} - {medicine.quantity}
                </li>
              ))}
            </ol>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
