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
import { Eye, Ban } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import userImage from "@/assets/images/user.png";
import { changeStatus } from "@/services/UserService";

export default function UsersManagement({
  users,
}: {
  users: IUser[];
}) {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

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

  return (
    <div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">All Users</h1>
        </div>

        {users.length == 0 ? (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-2xl font-bold">No Users Found</h1>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profile</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <Image
                        src={user.profileImage || userImage.src}
                        alt={user.name}
                        className="object-cover rounded-full"
                        width={40}
                        height={40}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.status === "active" ? "default" : "destructive"}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-center gap-2">
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
                          onConfirm={() => handleBlock(user._id as string, user.status as string)}
                          title={`Are you sure you want to ${user.status === "active" ? "block" : "unblock"} this user?`}
                          description="This action can be reversed later."
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex border-t items-center justify-center space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm">
                Page {currentPage} of {Math.ceil(users.length / itemsPerPage)}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === Math.ceil(users.length / itemsPerPage)}
              >
                Next
              </Button>
            </div>
          </div>
        )}

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
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
