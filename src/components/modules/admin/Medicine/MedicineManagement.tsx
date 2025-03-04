"use client";
import CreateMedicineForm from "@/components/forms/admin/CreateMedicineForm";
import EditMedicineForm from "@/components/forms/admin/EditMedicineForm";
import ConfirmationBox from "@/components/shared/ConfirmationBox";
import { CustomModal } from "@/components/shared/CustomModal";
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
import { deleteMedicine } from "@/services/medicines";
import { IMedicine } from "@/types";
import { Eye, Trash2, Edit } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export default function MedicineManagement({
  medicines,
}: {
  medicines: IMedicine[];
}) {
  const [selectedMedicine, setSelectedMedicine] = useState<IMedicine | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMedicines = medicines.slice(indexOfFirstItem, indexOfLastItem);

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
  return (
    <div>
      <div className="space-y-4">
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

        {medicines.length == 0 ? (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-2xl font-bold">No Medicines Found</h1>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Prescription</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentMedicines.map((medicine) => (
                  <TableRow key={medicine._id}>
                    <TableCell>
                      <Image
                        src={medicine.image}
                        alt={medicine.name}
                        className="object-cover rounded w-16 h-16"
                        width={64}
                        height={64}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {medicine.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{medicine.price}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{medicine.quantity}</Badge>
                    </TableCell>
                    <TableCell>
                      {medicine.category}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {medicine.prescriptionRequired
                          ? "Required"
                          : "Not Required"}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-center gap-2">
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
                          title="Are you sure you want to delete this medicine?"
                          description="This action cannot be undone."
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* pagination part  */}
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
                Page {currentPage} of{" "}
                {Math.ceil(medicines.length / itemsPerPage)}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(medicines.length / itemsPerPage)
                }
              >
                Next
              </Button>
            </div>
          </div>
        )}

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
    </div>
  );
}
