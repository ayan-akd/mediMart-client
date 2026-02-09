"use client";
import { IMedicine, TOrder } from "@/types";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

interface TopMedicinesProps {
  orders: TOrder[];
}

export default function TopMedicines({ orders }: TopMedicinesProps) {
  const topMedicines = useMemo(() => {
    const medicinesSold: { [key: string]: { count: number; medicine: IMedicine } } = {};
    
    // Count medicine sales from orders
    orders.forEach((order) => {
      order.medicines?.forEach((orderMedicine) => {
        // Destructure and validate in one step
        const { medicine, quantity } = orderMedicine;
        const medicineId = medicine?._id;
        
        // Skip if any required data is missing
        if (!medicineId || !medicine || typeof quantity !== 'number') {
          return;
        }
        
        if (medicinesSold[medicineId]) {
          medicinesSold[medicineId].count += quantity;
        } else {
          medicinesSold[medicineId] = {
            count: quantity,
            medicine: medicine,
          };
        }
      });
    });

    // Convert to array and sort by count
    const sortedMedicines = Object.values(medicinesSold)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Calculate percentages
    const maxCount = sortedMedicines[0]?.count || 1;
    return sortedMedicines.map((item) => ({
      ...item,
      percentage: (item.count / maxCount) * 100,
    }));
  }, [orders]);

  if (topMedicines.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-muted-foreground">
        No sales data available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {topMedicines.map((item, index) => (
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
                {item.count} sold
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
