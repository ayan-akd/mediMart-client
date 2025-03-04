import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { decrementQuantity, IMedicineOrder, incrementQuantity, removeMedicineFromCart } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hook";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

export default function CartCard({ item }: { item: IMedicineOrder }) {
    const dispatch = useAppDispatch();
    const increment = (id:string) => {
        dispatch(incrementQuantity(id));
    };
    const decrement = (id:string) => {
        dispatch(decrementQuantity(id));
    };
    const remove = (id:string) => {
        dispatch(removeMedicineFromCart(id));
    };
    return (
        <Card key={item._id} className="p-4">
              <div className="flex gap-4">
                <div className="relative w-24 h-24">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="font-bold">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                  <p className="text-sm text-muted-foreground">
                    Stock Available: {item.quantity}
                  </p>
                  {item.prescriptionRequired && (
                    <p className="text-sm text-red-500">
                      Prescription Required
                    </p>
                  )}
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <Button onClick={()=> decrement(item._id as string)} variant="outline" size="icon">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span>{item.orderQuantity}</span>
                      <Button onClick={()=> increment(item._id as string)} variant="outline" size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button onClick={()=> remove(item._id as string)} variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
    );
}