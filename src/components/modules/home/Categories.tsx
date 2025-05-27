"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Categories
export const medicineCategories = [
  "Pain Relievers",
  "Antibiotics",
  "Antivirals",
  "Antifungals",
  "Allergy Medicines",
  "Digestive Medicines",
  "Cold & Flu",
  "Diabetes Medicines",
  "Blood Pressure Medicines",
  "Heart Medicines",
  "Mental Health",
  "Hormones & Steroids",
  "Skin Care",
  "Eye & Ear Care",
  "Cancer Medicines",
  "Vitamins & Supplements",
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Pain Relievers":
      return "💊";
    case "Antibiotics":
      return "🦠";
    case "Antivirals":
      return "🛡️";
    case "Antifungals":
      return "🍄";
    case "Allergy Medicines":
      return "🤧";
    case "Digestive Medicines":
      return "🫃";
    case "Cold & Flu":
      return "🤒";
    case "Diabetes Medicines":
      return "🩸";
    case "Blood Pressure Medicines":
      return "❤️";
    case "Heart Medicines":
      return "💓";
    case "Mental Health":
      return "🧠";
    case "Hormones & Steroids":
      return "⚗️";
    case "Skin Care":
      return "🧴";
    case "Eye & Ear Care":
      return "👁️";
    case "Cancer Medicines":
      return "🎗️";
    case "Vitamins & Supplements":
      return "💪";
    default:
      return "💊";
  }
};

export default function CategoriesPage() {
  const [search, setSearch] = useState("");

  const filteredCategories = medicineCategories.filter((category) =>
    category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-16 bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-[90%] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Browse Categories
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Discover a wide range of medicines tailored to your specific health needs.
          </p>
        </div>

        {/* Search Input */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search categories..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Category Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {filteredCategories.map((category) => (
            <motion.div
              key={category}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link href={`/shop?categories=${encodeURIComponent(category)}`}>
                <Card className="group h-full cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-600 hover:-translate-y-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardContent className="p-6 text-center flex flex-col items-center justify-center min-h-[160px]">
                    <div className="text-4xl md:text-5xl mb-3 transition-transform duration-300 group-hover:scale-110">
                      {getCategoryIcon(category)}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 text-center leading-tight">
                      {category}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-14">
          <Link href="/shop">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              View All Medicines
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
