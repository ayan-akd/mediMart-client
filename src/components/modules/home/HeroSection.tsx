"use client"

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero.jpg";

export default function HeroSection() {
    return (
        <div className="relative rounded-4xl min-h-[85vh] md:min-h-[75vh] bg-gradient-to-r from-rose-50 to-rose-100 dark:from-gray-950 dark:to-gray-900">
            <div className="container mx-auto px-6 py-16 flex flex-col lg:flex-row items-center justify-between">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full lg:w-1/2 space-y-8"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-100">
                        Your Trusted Online
                        <span className="text-[#E11D48]"> Pharmacy Partner</span>
                    </h1>
                    
                    <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                        Access quality medicines from the comfort of your home. 
                        Safe, reliable, and convenient healthcare solutions at your fingertips.
                    </p>
                    
                    
                        <Button 
                            variant="default"
                            className="bg-[#E11D48] hover:bg-rose-600 text-white"
                            size="lg"
                            asChild
                        >
                            <Link href="/shop">Shop Now</Link>
                        </Button>
                        
                    
                    
                    <div className="flex flex-wrap gap-8 mt-8">
                        <div className="flex items-center gap-2">
                            <div className="text-[#E11D48]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-gray-600 dark:text-gray-300">Verified Medicines</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="text-[#E11D48]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-gray-600 dark:text-gray-300">24/7 Support</span>
                        </div>
                    </div>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="hidden lg:block"
                >
                    <Image
                        src={heroImage}
                        alt="MediMart Hero"
                        width={600}
                        height={500}
                        className="object-cover h-auto w-auto"
                        priority
                    />
                </motion.div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-t-3xl">
                <div className="container mx-auto px-6 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex items-center gap-4">
                            <div className="bg-rose-100 dark:bg-rose-900 p-3 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E11D48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold dark:text-gray-100">Fast Delivery</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Within 24-48 hours</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <div className="bg-rose-100 dark:bg-rose-900 p-3 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E11D48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold dark:text-gray-100">100% Genuine</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Quality assured products</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <div className="bg-rose-100 dark:bg-rose-900 p-3 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E11D48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold dark:text-gray-100">Best Prices</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Competitive pricing</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
