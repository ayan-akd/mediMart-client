"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import aboutImage from "@/assets/images/about.jpg"

export default function AboutComponent() {
    const features = [
        {
            title: "Licensed Pharmacy",
            description: "Fully licensed and regulated pharmacy operations ensuring your safety",
            icon: "🏥"
        },
        {
            title: "Expert Team",
            description: "Qualified pharmacists and healthcare professionals at your service",
            icon: "👨‍⚕️"
        },
        {
            title: "Quality Assured",
            description: "Strict quality control measures for all medical products",
            icon: "✔️"
        },
        {
            title: "24/7 Support",
            description: "Round-the-clock customer support for your healthcare needs",
            icon: "🕒"
        }
    ];

    return (
        <div className="min-h-screen py-16">
            {/* Hero Section */}
            <section className="container mx-auto px-4 mb-16">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                        Your Health, Our Priority
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                        MediMart is revolutionizing healthcare access through our innovative online pharmacy platform.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="bg-gray-50 dark:bg-gray-900 py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[400px]">
                            <Image
                                src={aboutImage}
                                alt="MediMart Mission"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Mission</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                At MediMart, we believe everyone deserves easy access to quality healthcare. Our mission is to make medicine procurement simple, reliable, and affordable.
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                                Founded in 2023, we&apos;ve served thousands of customers nationwide, ensuring they receive genuine medicines right at their doorstep.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Why Choose MediMart</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full">
                                <CardContent className="p-6 text-center">
                                    <div className="text-4xl mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-[#E11D48] text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold mb-2">50K+</div>
                            <div className="text-sm">Happy Customers</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">100%</div>
                            <div className="text-sm">Genuine Medicines</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">24/7</div>
                            <div className="text-sm">Customer Support</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">500+</div>
                            <div className="text-sm">Medicine Brands</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
