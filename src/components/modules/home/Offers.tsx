"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Clock, 
  Percent, 
  ShoppingCart, 
  Star, 
  Timer,
  Zap,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  originalPrice: number;
  discountedPrice: number;
  category: string;
  image: string;
  expiresAt: Date;
  isLimited: boolean;
  stockLeft?: number;
  rating: number;
  reviews: number;
  type: "percentage" | "fixed" | "bogo" | "free_shipping";
}

// Sample offers data
const sampleOffers: Offer[] = [
  {
    id: "1",
    title: "Pain Relief Combo Pack",
    description: "Get instant relief with our bestselling pain medications",
    discount: 25,
    originalPrice: 120,
    discountedPrice: 90,
    category: "Pain Relievers",
    image: "💊",
    expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    isLimited: true,
    stockLeft: 15,
    rating: 4.8,
    reviews: 234,
    type: "percentage"
  },
  {
    id: "2",
    title: "Vitamin D3 + Calcium Bundle",
    description: "Strengthen your bones with this powerful combination",
    discount: 30,
    originalPrice: 80,
    discountedPrice: 56,
    category: "Vitamins & Supplements",
    image: "💪",
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    isLimited: false,
    rating: 4.6,
    reviews: 189,
    type: "percentage"
  },
  {
    id: "3",
    title: "Cold & Flu Essential Kit",
    description: "Everything you need to fight cold and flu symptoms",
    discount: 40,
    originalPrice: 150,
    discountedPrice: 90,
    category: "Cold & Flu",
    image: "🤒",
    expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    isLimited: true,
    stockLeft: 8,
    rating: 4.9,
    reviews: 156,
    type: "percentage"
  },
  {
    id: "4",
    title: "Heart Health Starter Pack",
    description: "Support your cardiovascular health with expert-recommended medicines",
    discount: 20,
    originalPrice: 200,
    discountedPrice: 160,
    category: "Heart Medicines",
    image: "💓",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    isLimited: false,
    rating: 4.7,
    reviews: 298,
    type: "percentage"
  }
];

const CountdownTimer = ({ expiresAt }: { expiresAt: Date }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = expiresAt.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt]);

  return (
    <div className="flex items-center gap-2 text-sm">
      <Timer className="h-4 w-4 text-red-500" />
      <span className="text-red-600 dark:text-red-400 font-medium">
        {timeLeft.days > 0 && `${timeLeft.days}d `}
        {String(timeLeft.hours).padStart(2, '0')}:
        {String(timeLeft.minutes).padStart(2, '0')}:
        {String(timeLeft.seconds).padStart(2, '0')}
      </span>
    </div>
  );
};

const OfferCard = ({ offer, index }: { offer: Offer; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="group h-full bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden relative">
        {/* Discount Badge */}
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-1">
            -{offer.discount}%
          </Badge>
        </div>

        {/* Limited Stock Badge */}
        {offer.isLimited && offer.stockLeft && (
          <div className="absolute top-4 left-4 z-10">
            <Badge variant="destructive" className="animate-pulse">
              Only {offer.stockLeft} left!
            </Badge>
          </div>
        )}

        <CardContent className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
              {offer.image}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-2">
                {offer.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {offer.description}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(offer.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {offer.rating} ({offer.reviews} reviews)
            </span>
          </div>

          {/* Category */}
          <div className="mb-4">
            <Badge variant="secondary" className="text-xs">
              {offer.category}
            </Badge>
          </div>

          {/* Pricing */}
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${offer.discountedPrice}
              </span>
              <span className="text-lg text-gray-500 line-through">
                ${offer.originalPrice}
              </span>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400 font-medium">
              You save ${offer.originalPrice - offer.discountedPrice}
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="mb-6">
            <CountdownTimer expiresAt={offer.expiresAt} />
          </div>

          {/* Action Button */}
          <div className="mt-auto">
            <Link href={`/shop?categories=${encodeURIComponent(offer.category)}`}>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 transition-all duration-300 hover:shadow-lg group-hover:scale-105">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Shop Now
              </Button>
            </Link>
          </div>
        </CardContent>

        {/* Animated Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </Card>
    </motion.div>
  );
};

export default function OffersComponent() {
  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-[90%] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Special Offers
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Don&apos;t miss out on these amazing deals! Limited time offers on your favorite medicines and health products.
          </p>
        </div>

        {/* Featured Offer Banner */}
        <div className="mb-12">
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 overflow-hidden relative">
            <CardContent className="p-8 relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-6 w-6" />
                    <span className="text-sm font-semibold uppercase tracking-wide">
                      Flash Sale
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    Up to 50% OFF on All Categories
                  </h3>
                  <p className="text-orange-100 mb-4">
                    Limited time offer - grab your essentials now!
                  </p>
                  <CountdownTimer expiresAt={new Date(Date.now() + 6 * 60 * 60 * 1000)} />
                </div>
                <div className="flex-shrink-0">
                  <Link href="/shop">
                    <Button 
                      size="lg" 
                      className="bg-white text-orange-600 hover:bg-orange-50 font-bold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Shop All Deals
                      <Heart className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 text-6xl">💊</div>
              <div className="absolute bottom-4 left-4 text-4xl">🏥</div>
              <div className="absolute top-1/2 left-1/4 text-3xl">💉</div>
            </div>
          </Card>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {sampleOffers.map((offer, index) => (
            <OfferCard key={offer.id} offer={offer} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
            <Clock className="h-5 w-5" />
            <span className="text-sm">Offers updated daily</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button 
                size="lg" 
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Percent className="mr-2 h-5 w-5" />
                View All Offers
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
