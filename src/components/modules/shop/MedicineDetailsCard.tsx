"use client";
import { IMedicine } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hook";
import { addMedicineToCart } from "@/redux/features/cartSlice";
import { toast } from "sonner";

export default function MedicineDetailsCard({
  medicine,
}: {
  medicine: IMedicine;
}) {
  const dispatch = useAppDispatch();
  const addToCart = (medicine: IMedicine) => {
    dispatch(addMedicineToCart(medicine));
    toast.success(`${medicine.name} added to cart!`);
  };
  return (
    <div className="py-8">
      <Link href="/shop">
        <Button className="md:mb-10 mb-6">Go Back</Button>
      </Link>
      <Card className="p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src={medicine.image}
              alt={medicine.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{medicine.name}</h1>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">{medicine.category}</Badge>
                <Badge
                  variant={medicine.quantity > 0 ? "default" : "destructive"}
                >
                  {medicine.quantity > 0 ? "In Stock" : "Out of Stock"}
                </Badge>
                {medicine.prescriptionRequired && (
                  <Badge variant="destructive">Prescription Required</Badge>
                )}
              </div>
            </div>

            <div>
              <p className="text-2xl font-bold text-primary">
                ${medicine.price.toFixed(2)}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{medicine.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Manufacturer Details</h3>
              <p className="text-muted-foreground">{medicine.details}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Additional Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Expiry Date</p>
                  <p className="font-medium">
                    {new Date(medicine.expiryDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Stock Quantity</p>
                  <p className="font-medium">{medicine.quantity} units</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1"
                disabled={medicine.quantity === 0}
                onClick={() => {
                  addToCart(medicine);
                }}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
