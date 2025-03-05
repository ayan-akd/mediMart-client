import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IMedicine } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useAppDispatch } from "@/redux/hook";
import { addMedicineToCart } from "@/redux/features/cartSlice";
import { toast } from "sonner";

export default function MedicineCard({ medicine }: { medicine: IMedicine }) {
  const dispatch = useAppDispatch();
  const addToCart = (medicine: IMedicine) => {
    dispatch(addMedicineToCart(medicine));
    toast.success(`${medicine.name} added to cart!`);
  };
  return (
    <Card className="overflow-hidden">
      <div className="relative h-36">
        <Image
          src={medicine.image}
          alt={medicine.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        {medicine.prescriptionRequired && (
          <Badge className="absolute top-2 right-2" variant="destructive">
            Prescription Required
          </Badge>
        )}
      </div>
      <div className="p-4">
        <h3
          title={medicine.name}
          className="font-semibold text-lg mb-2 line-clamp-1"
        >
          {medicine.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {medicine.description}
        </p>
        <div className="flex justify-between items-center mb-4">
          <Badge variant={medicine.quantity > 0 ? "default" : "secondary"}>
            {medicine.quantity > 0 ? "In Stock" : "Out of Stock"}
          </Badge>
          <Badge variant="secondary">{medicine.category}</Badge>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-lg">${medicine.price}</p>
          </div>
          <div className="flex gap-2">
            <Link href={`/medicine/${medicine._id}`}>
              <Button variant="outline">View Details</Button>
            </Link>
            <Button
              variant="outline"
              size="icon"
              className="cursor-pointer"
              disabled={medicine.quantity === 0}
              onClick={() => addToCart(medicine)}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
