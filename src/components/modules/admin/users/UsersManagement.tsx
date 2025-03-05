"use client";
import ConfirmationBox from "@/components/shared/ConfirmationBox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IUser } from "@/types";
import { Eye, Ban, ArrowUpDown, ChevronDown } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import userImage from "@/assets/images/user.png";
import { changeStatus } from "@/services/UserService";
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
import { GetUsersOrders } from "./GetUsersOrders";


export default function UsersManagement({ users }: { users: IUser[] }) {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [open, setOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });
  const [filterValue, setFilterValue] = useState("");

  const lastPageIndex = useRef(pagination.pageIndex);

  const handleBlock = async (userId: string, status: string) => {
    let newStatus;
    if (status === "active") {
      newStatus = "blocked";
    } else {
      newStatus = "active";
    }
    const res = await changeStatus(userId, newStatus);
    if (res.success) {
      toast.success("User status changed successfully");
    }
  };

  const handleView = (user: IUser) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: "profileImage",
      header: "Image",
      cell: ({ row }) => (
        <Image
          src={row.original.profileImage || userImage.src}
          alt={row.original.name}
          width={50}
          height={50}
          className="rounded"
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
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => row.getValue("email"),
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <Badge variant="secondary">{row.getValue("role")}</Badge>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <Badge
          variant={row.original.status === "active" ? "default" : "destructive"}
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleView(user)}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <ConfirmationBox
              trigger={
                <Button
                  variant={user.status === "active" ? "destructive" : "outline"}
                  size="sm"
                >
                  <Ban className="h-4 w-4" />
                </Button>
              }
              onConfirm={() =>
                handleBlock(user._id as string, user.status as string)
              }
              title={`Are you sure you want to ${
                user.status === "active" ? "block" : "unblock"
              } this user?`}
              description="This action can be reversed later."
            />
          </div>
        );
      },
    },
  ];

  const filteredData = React.useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        user.email.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [filterValue, users]);

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
    <div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">All Users</h1>
        </div>
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter by name or email..."
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
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

        {users.length == 0 ? (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-2xl font-bold">No Users Found</h1>
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
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Image
                  src={selectedUser?.profileImage || userImage.src}
                  alt={selectedUser?.name || "User"}
                  className="rounded-full"
                  width={100}
                  height={100}
                />
                <div>
                  <h3 className="font-bold text-lg">{selectedUser?.name}</h3>
                  <p className="text-gray-500">{selectedUser?.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Phone:</p>
                  <p>{selectedUser?.phoneNumber || "Not provided"}</p>
                </div>
                <div>
                  <p className="font-semibold">Role:</p>
                  <p className="capitalize">{selectedUser?.role}</p>
                </div>
                <div>
                  <p className="font-semibold">Status:</p>
                  <p className="capitalize">{selectedUser?.status}</p>
                </div>
                <div>
                  <p className="font-semibold">Address:</p>
                  <p>{selectedUser?.address || "Not provided"}</p>
                </div>
              </div>
              <GetUsersOrders userId={selectedUser?._id as string} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
