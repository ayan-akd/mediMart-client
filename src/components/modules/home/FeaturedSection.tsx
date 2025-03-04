"use client";

import { useState } from "react";
import Link from "next/link";
import { IMedicine } from "@/types";
import MedicineCard from "../shop/MedicineCard";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function FeaturedSection({ data }: { data: IMedicine[] }) {
    const [query, setQuery] = useState("");
    const [filtered, setFiltered] = useState<IMedicine[]>([]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        if (value.trim() === "") {
            setFiltered([]);
            return;
        }
        const results = data.filter(med => 
            med.name.toLowerCase().includes(value.toLowerCase()) ||
            med.category.toLowerCase().includes(value.toLowerCase())
        );
        setFiltered(results);
    };

    // Get top 3 most expensive medicines
    const featuredMedicines = [...data]
        .sort((a, b) => b.price - a.price)
        .slice(0, 3);

    return (
        <section className="container mx-auto py-16">
            <div className="container">
                <h2 className="text-3xl font-bold text-center mb-8">Featured Medicines</h2>
                
                {/* Search Bar */}
                <div className="relative mb-8 w-full max-w-lg mx-auto">
                    <Input 
                        type="text" 
                        placeholder="Search medicines by name or category..." 
                        value={query} 
                        onChange={handleSearch} 
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                    {filtered.length > 0 && (
                        <div className="absolute w-full bg-white border border-gray-300 shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto z-10">
                            {filtered.map(med => (
                                <Link 
                                    key={med._id} 
                                    href={`/shop/${med._id}`}
                                    className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100"
                                >
                                    <Image src={med.image} alt={med.name} width={10} height={10} className="w-10 h-10 object-cover rounded" />
                                    <span>{med.name} - {med.category}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredMedicines.map((medicine) => (
                        <MedicineCard key={medicine._id} medicine={medicine} />
                    ))}
                </div>
            </div>
        </section>
    );
}
