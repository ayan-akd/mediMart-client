/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { TOrder } from "@/types";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

interface FavoriteMedicinesProps {
  orders: TOrder[];
}

export default function FavoriteMedicines({ orders }: FavoriteMedicinesProps) {
  const favoriteMedicines = useMemo(() => {
    const medicineCount: { [key: string]: { count: number; medicine: any } } = {};
    
    // Count medicine purchases from delivered orders
    orders
      .filter(order => order.status === "Delivered")
      .forEach((order) => {
        order.medicines?.forEach((orderMedicine) => {
          const medicineId = orderMedicine.medicine._id;
          
          if (!medicineId || typeof medicineId !== 'string') {
            return;
          }
          
          if (medicineCount[medicineId]) {
            medicineCount[medicineId].count += orderMedicine.quantity;
          } else {
            medicineCount[medicineId] = {
              count: orderMedicine.quantity,
              medicine: orderMedicine.medicine,
            };
          }
        });
      });

    // Convert to array and sort by count
    const sortedMedicines = Object.values(medicineCount)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Calculate percentages
    const maxCount = sortedMedicines[0]?.count || 1;
    return sortedMedicines.map((item) => ({
      ...item,
      percentage: (item.count / maxCount) * 100,
    }));
  }, [orders]);

  if (favoriteMedicines.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-muted-foreground">
        <div className="text-center">
          <p className="text-sm">No purchase history yet</p>
          <p className="text-xs">Your favorite medicines will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {favoriteMedicines.map((item, index) => (
        <div key={item.medicine._id} className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <Image
              src={item.medicine.image}
              alt={item.medicine.name}
              width={40}
              height={40}
              className="rounded-md object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium truncate">
                {item.medicine.name}
              </p>
              <Badge variant="secondary" className="ml-2">
                #{index + 1}
              </Badge>
            </div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">
                Bought {item.count} times
              </p>
              <p className="text-xs font-medium">
                ${item.medicine.price}
              </p>
            </div>
            <Progress value={item.percentage} className="h-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
