/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { TOrder } from "@/types";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface RevenueChartProps {
  orders: TOrder[];
}

export default function RevenueChart({ orders }: RevenueChartProps) {
  const chartData = useMemo(() => {
    // Group orders by month
    const monthlyRevenue: { [key: string]: number } = {};
    
    orders.forEach((order) => {
      if (order.status === "Delivered") {
        const date = new Date(order.createdAt as Date);
        const monthKey = date.toLocaleDateString('en-US', { 
          month: 'short', 
          year: 'numeric' 
        });
        
        monthlyRevenue[monthKey] = (monthlyRevenue[monthKey] || 0) + order.totalPrice;
      }
    });

    // Convert to array and sort by date
    return Object.entries(monthlyRevenue)
      .map(([month, revenue]) => ({
        month,
        revenue: Number(revenue.toFixed(2)),
      }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
      .slice(-6); // Last 6 months
  }, [orders]);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="month" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: any) => `$${value}`}
        />
        <Tooltip 
          formatter={(value: any) => [`$${value}`, 'Revenue']}
          labelStyle={{ color: 'black' }}
        />
        <Legend />
        <Bar 
          dataKey="revenue" 
          fill="#8884d8" 
          radius={[4, 4, 0, 0]}
          name="Revenue"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
