"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Megaphone, 
  Calendar, 
  Clock, 
  Search, 
  Filter,
  AlertCircle,
  Info,
  CheckCircle,
  Star,
  Pill,
  Truck,
  Shield
} from "lucide-react";
import { motion } from "framer-motion";

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: "info" | "warning" | "success" | "promotion";
  date: string;
  time: string;
  priority: "high" | "medium" | "low";
  category: "general" | "medicine" | "delivery" | "policy" | "promotion";
  isNew: boolean;
}

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "New Medicine Stock Available - Diabetes Care",
    content: "We've restocked our diabetes care section with the latest medications including Metformin, Insulin, and glucose monitoring supplies. All items are available with valid prescriptions.",
    type: "info",
    date: "2024-01-15",
    time: "10:30 AM",
    priority: "high",
    category: "medicine",
    isNew: true
  },
  {
    id: "2",
    title: "Free Home Delivery for Orders Above ৳1000",
    content: "Enjoy free home delivery on all orders above ৳1000. This offer is valid for all areas within Dhaka city. Delivery time: 2-4 hours for urgent medicines.",
    type: "promotion",
    date: "2024-01-14",
    time: "2:15 PM",
    priority: "medium",
    category: "delivery",
    isNew: true
  },
  {
    id: "3",
    title: "Prescription Upload System Updated",
    content: "Our prescription upload system has been enhanced for better security and faster processing. You can now upload multiple prescription images for a single order.",
    type: "success",
    date: "2024-01-13",
    time: "9:00 AM",
    priority: "medium",
    category: "policy",
    isNew: false
  },
  {
    id: "4",
    title: "Winter Health Tips & Medicine Availability",
    content: "Stay healthy this winter! We have all essential cold and flu medications in stock. Remember to consult with healthcare professionals before taking any medication.",
    type: "info",
    date: "2024-01-12",
    time: "11:45 AM",
    priority: "low",
    category: "general",
    isNew: false
  },
  {
    id: "5",
    title: "ShurjoPay Integration - Secure Payment Gateway",
    content: "We've integrated ShurjoPay for secure and convenient online payments. You can now pay using mobile banking, credit/debit cards, and net banking.",
    type: "success",
    date: "2024-01-10",
    time: "4:20 PM",
    priority: "high",
    category: "policy",
    isNew: false
  }
];

const getAnnouncementIcon = (type: string) => {
  switch (type) {
    case "info":
      return <Info className="h-5 w-5 text-blue-500" />;
    case "warning":
      return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    case "success":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "promotion":
      return <Star className="h-5 w-5 text-purple-500" />;
    default:
      return <Info className="h-5 w-5 text-blue-500" />;
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "medicine":
      return <Pill className="h-4 w-4" />;
    case "delivery":
      return <Truck className="h-4 w-4" />;
    case "policy":
      return <Shield className="h-4 w-4" />;
    default:
      return <Megaphone className="h-4 w-4" />;
  }
};

const getBadgeVariant = (type: string) => {
  switch (type) {
    case "info":
      return "default";
    case "warning":
      return "destructive";
    case "success":
      return "secondary";
    case "promotion":
      return "outline";
    default:
      return "default";
  }
};

export default function AnnouncementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");

  const filteredAnnouncements = mockAnnouncements.filter((announcement) => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || announcement.category === selectedCategory;
    const matchesPriority = selectedPriority === "all" || announcement.priority === selectedPriority;
    
    return matchesSearch && matchesCategory && matchesPriority;
  });

  const categories = ["all", "general", "medicine", "delivery", "policy", "promotion"];
  const priorities = ["all", "high", "medium", "low"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Megaphone className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Announcements
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay updated with the latest news, medicine availability, delivery updates, and important information from MediMart
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
              title="Category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority Filter */}
            <div className="flex items-center gap-2">
              <select
              title="Priority"
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Announcements List */}
        <div className="space-y-6">
          {filteredAnnouncements.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Megaphone className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                No announcements found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          ) : (
            filteredAnnouncements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {getAnnouncementIcon(announcement.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-lg font-semibold">
                              {announcement.title}
                            </CardTitle>
                            {announcement.isNew && (
                              <Badge variant="destructive" className="text-xs">
                                NEW
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(announcement.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {announcement.time}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant={getBadgeVariant(announcement.type)}>
                          {announcement.type.toUpperCase()}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {getCategoryIcon(announcement.category)}
                          <span className="text-xs text-gray-500 capitalize">
                            {announcement.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {announcement.content}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <Badge 
                        variant="outline" 
                        className={`
                          ${announcement.priority === 'high' ? 'border-red-500 text-red-600' : ''}
                          ${announcement.priority === 'medium' ? 'border-yellow-500 text-yellow-600' : ''}
                          ${announcement.priority === 'low' ? 'border-green-500 text-green-600' : ''}
                        `}
                      >
                        {announcement.priority.toUpperCase()} PRIORITY
                      </Badge>
                      <Button variant="outline" size="sm">
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="mb-6 text-blue-100">
            Subscribe to our newsletter to receive the latest announcements and health tips directly in your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              className="flex-1 bg-white text-gray-900"
            />
            <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
