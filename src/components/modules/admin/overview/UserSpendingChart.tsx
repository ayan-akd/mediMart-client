"use client";
import { TOrder } from "@/types";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface UserSpendingChartProps {
  orders: TOrder[];
}

export default function UserSpendingChart({ orders }: UserSpendingChartProps) {
  const chartData = useMemo(() => {
    // Group orders by month
    const monthlySpending: { [key: string]: number } = {};
    
    orders.forEach((order) => {
      if (order.status === "Delivered") {
        const date = new Date(order.createdAt as Date);
        const monthKey = date.toLocaleDateString('en-US', { 
          month: 'short', 
          year: 'numeric' 
        });
        
        monthlySpending[monthKey] = (monthlySpending[monthKey] || 0) + order.totalPrice;
      }
    });

    // Convert to array and sort by date
    return Object.entries(monthlySpending)
      .map(([month, spending]) => ({
        month,
        spending: Number(spending.toFixed(2)),
      }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
      .slice(-6); // Last 6 months
  }, [orders]);

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-muted-foreground">
        No spending data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
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
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip 
          formatter={(value) => [`$${value}`, 'Spending']}
          labelStyle={{ color: 'black' }}
        />
        <Legend />
        <Line 
          type="monotone"
          dataKey="spending" 
          stroke="#8884d8" 
          strokeWidth={2}
          dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
          name="Monthly Spending"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
