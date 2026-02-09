"use client";
import { TOrder } from "@/types";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface UserOrderStatusChartProps {
  orders: TOrder[];
}

const COLORS = {
  Processing: "#f59e0b",
  Shipped: "#3b82f6",
  Delivered: "#10b981",
  Cancelled: "#ef4444",
  Failed: "#6b7280",
  Pending: "#8b5cf6",
  Paid: "#06b6d4",
};

export default function UserOrderStatusChart({ orders }: UserOrderStatusChartProps) {
  const chartData = useMemo(() => {
    const statusCount: { [key: string]: number } = {};
    
    orders.forEach((order) => {
      // Check if status exists and is valid
      if (order.status && typeof order.status === 'string') {
        statusCount[order.status] = (statusCount[order.status] || 0) + 1;
      }
    });

    return Object.entries(statusCount).map(([status, count]) => ({
      name: status,
      value: count,
      color: COLORS[status as keyof typeof COLORS] || "#6b7280",
    }));
  }, [orders]);

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[250px] text-muted-foreground">
        No order data available
      </div>
    );
  }

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={60}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [value, `${name} Orders`]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
