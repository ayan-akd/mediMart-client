"use client"

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import ava1 from "@/assets/images/avatars/ava1.jpeg";
import ava2 from "@/assets/images/avatars/ava2.jpeg";
import ava3 from "@/assets/images/avatars/ava3.jpeg";
import ava4 from "@/assets/images/avatars/ava4.jpeg";
import ava5 from "@/assets/images/avatars/ava5.jpeg";
import ava6 from "@/assets/images/avatars/ava6.jpeg";
import ava7 from "@/assets/images/avatars/ava7.jpeg";
import ava8 from "@/assets/images/avatars/ava8.jpeg";


const reviews = [
    {
        id: 1,
        name: "Sarah Johnson",
        avatar: ava1,
        role: "Regular Customer",
        content: "MediMart has been a lifesaver! Their 24/7 delivery service means I never have to worry about running out of my regular medications.",
        rating: 5
    },
    {
        id: 2,
        name: "Dr. Michael Chen",
        avatar: ava2,
        role: "Healthcare Professional",
        content: "As a healthcare provider, I appreciate MediMart's commitment to authenticity. Their prescription verification process is thorough and reliable.",
        rating: 5
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        avatar: ava4,
        role: "Monthly Subscriber",
        content: "The monthly medication subscription service has made managing my chronic condition so much easier. Great prices and always on time!",
        rating: 5
    },
    {
        id: 4,
        name: "Robert Williams",
        avatar: ava3,
        role: "Verified Buyer",
        content: "Excellent customer service! Had a query about my order, and their pharmacist got back to me within minutes. Very professional.",
        rating: 4
    },
    {
        id: 5,
        name: "Priya Patel",
        avatar: ava8,
        role: "Regular Customer",
        content: "The app is so user-friendly, and I love how I can easily reorder my prescriptions with just a few clicks. Highly recommended!",
        rating: 5
    },
    {
        id: 6,
        name: "James Anderson",
        avatar: ava5,
        role: "New Customer",
        content: "First time using an online pharmacy, and I'm impressed! The delivery was faster than expected, and the packaging was secure.",
        rating: 5
    },
    {
        id: 7,
        name: "Lisa Thompson",
        avatar: ava7,
        role: "Regular Buyer",
        content: "Their prices are consistently lower than local pharmacies, and they often have great deals. The quality is never compromised.",
        rating: 4
    },
    {
        id: 8,
        name: "David Kim",
        avatar: ava6,
        role: "Verified Customer",
        content: "The prescription refill reminders are so helpful. Haven't missed a dose since I started using MediMart. Outstanding service!",
        rating: 5
    }
];

export default function Reviews() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        What Our Customers Say
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Trusted by thousands of customers nationwide
                    </p>
                </div>

                <Carousel
                  plugins={[
                    Autoplay({
                      delay: 2000,
                    }),
                  ]}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full mx-auto"
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {reviews.map((review, index) => (
                            <CarouselItem key={review.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card className="">
                                        <CardContent className="p-6 h-[220px]">
                                            <div className="flex items-center gap-4 mb-4">
                                                <Avatar>
                                                    <AvatarImage src={review.avatar.src} alt={review.name} />
                                                    <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">{review.name}</h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">{review.role}</p>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300 line-clamp-4">{review.content}</p>
                                            <div className="flex gap-1 mt-4">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className="w-5 h-5 text-[#E11D48]"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex" />
                    <CarouselNext className="hidden md:flex" />
                </Carousel>
            </div>
        </section>
    );
}
