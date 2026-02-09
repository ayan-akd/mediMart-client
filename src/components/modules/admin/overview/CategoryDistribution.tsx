"use client";
import { IMedicine } from "@/types";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface CategoryDistributionProps {
  medicines: IMedicine[];
}

const CATEGORY_COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00ff00",
  "#ff00ff", "#00ffff", "#ff0000", "#0000ff", "#ffff00",
  "#800080", "#ffa500", "#a52a2a", "#808080", "#000080",
  "#008000"
];

export default function CategoryDistribution({ medicines }: CategoryDistributionProps) {
  const chartData = useMemo(() => {
    const categoryCount: { [key: string]: number } = {};
    
    medicines.forEach((medicine) => {
      categoryCount[medicine.category] = (categoryCount[medicine.category] || 0) + 1;
    });

    return Object.entries(categoryCount)
      .map(([category, count], index) => ({
        name: category,
        value: count,
        color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8); // Top 8 categories
  }, [medicines]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={60}
          fill="#8884d8"
          dataKey="value"
          label={({ percent }) => 
            percent > 0.05 ? `${(percent * 100).toFixed(0)}%` : ''
          }
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [value, `${name} Medicines`]} />
        <Legend 
          wrapperStyle={{ fontSize: '12px' }}
          iconSize={8}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
