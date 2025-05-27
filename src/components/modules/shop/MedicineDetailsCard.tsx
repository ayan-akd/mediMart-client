"use client";
import { IMedicine } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Star, StarHalf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hook";
import { addMedicineToCart } from "@/redux/features/cartSlice";
import { toast } from "sonner";
import { useState } from "react";
import MedicineCard from "./MedicineCard";

// Star Rating Component
const StarRating = ({ 
  rating, 
  onRatingChange, 
  readonly = false, 
  size = "md" 
}: { 
  rating: number; 
  onRatingChange?: (rating: number) => void; 
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };

  const renderStar = (index: number) => {
    const starValue = index + 1;
    const currentRating = readonly ? rating : (hoverRating || rating);
    
    if (currentRating >= starValue) {
      return <Star className={`${sizeClasses[size]} text-yellow-400 fill-current`} />;
    } else if (currentRating >= starValue - 0.5) {
      return <StarHalf className={`${sizeClasses[size]} text-yellow-400 fill-current`} />;
    } else {
      return <Star className={`${sizeClasses[size]} text-gray-300`} />;
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <button
          key={index}
          type="button"
          disabled={readonly}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform duration-150`}
          onMouseEnter={() => !readonly && setHoverRating(index + 1)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
          onClick={() => !readonly && onRatingChange?.(index + 1)}
        >
          {renderStar(index)}
        </button>
      ))}
    </div>
  );
};

// Average Ratings Display Component
const AverageRatings = () => {
  // Mock data - replace with actual ratings from your backend
  const ratingsData = {
    averageRating: 4.3,
    totalReviews: 127,
    ratingBreakdown: [
      { stars: 5, count: 65, percentage: 51 },
      { stars: 4, count: 38, percentage: 30 },
      { stars: 3, count: 15, percentage: 12 },
      { stars: 2, count: 6, percentage: 5 },
      { stars: 1, count: 3, percentage: 2 },
    ]
  };

  return (
    <Card className="p-6 mt-6">
      <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Overall Rating */}
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">
            {ratingsData.averageRating}
          </div>
          <StarRating rating={ratingsData.averageRating} readonly size="lg" />
          <p className="text-sm text-muted-foreground mt-2">
            Based on {ratingsData.totalReviews} reviews
          </p>
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-2">
          {ratingsData.ratingBreakdown.map((item) => (
            <div key={item.stars} className="flex items-center gap-3">
              <span className="text-sm w-8">{item.stars}★</span>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-8">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

// User Rating Component
const UserRating = () => {
  const [userRating, setUserRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async () => {
    if (userRating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Review submitted successfully!");
      setUserRating(0);
      setReview("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Card className="p-6 mt-6">
      <h3 className="text-xl font-semibold mb-4">Rate This Product</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Your Rating</label>
          <StarRating 
            rating={userRating} 
            onRatingChange={setUserRating}
            size="lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Your Review (Optional)
          </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience with this medicine..."
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none h-24 bg-background"
            maxLength={500}
          />
          <p className="text-xs text-muted-foreground mt-1">
            {review.length}/500 characters
          </p>
        </div>

        <Button 
          onClick={handleSubmitReview}
          disabled={isSubmitting || userRating === 0}
          className="w-full md:w-auto"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </div>
    </Card>
  );
};

// Suggested Products Component
const SuggestedProducts = ({ 
  currentMedicine, 
  allMedicines 
}: { 
  currentMedicine: IMedicine; 
  allMedicines: IMedicine[];
}) => {
  // Filter out current medicine and get suggestions based on category
  const suggestedMedicines = allMedicines
    .filter(medicine => 
      medicine._id !== currentMedicine._id && 
      medicine.category === currentMedicine.category
    )
    .slice(0, 4); // Show only 4 suggestions

  // If not enough medicines in same category, fill with other medicines
  if (suggestedMedicines.length < 4) {
    const otherMedicines = allMedicines
      .filter(medicine => 
        medicine._id !== currentMedicine._id && 
        medicine.category !== currentMedicine.category &&
        !suggestedMedicines.some(suggested => suggested._id === medicine._id)
      )
      .slice(0, 4 - suggestedMedicines.length);
    
    suggestedMedicines.push(...otherMedicines);
  }

  if (suggestedMedicines.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">You Might Also Like</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {suggestedMedicines.map((medicine) => (
          <MedicineCard key={medicine._id} medicine={medicine} />
        ))}
      </div>
    </div>
  );
};

export default function MedicineDetailsCard({
  medicine,
  allMedicines = []
}: {
  medicine: IMedicine;
  allMedicines?: IMedicine[];
}) {
  const dispatch = useAppDispatch();
  
  const addToCart = (medicine: IMedicine) => {
    dispatch(addMedicineToCart(medicine));
    toast.success(`${medicine.name} added to cart!`);
  };

  return (
    <div className="py-8">
      <Link href="/shop">
        <Button className="md:mb-10 mb-6">Go Back</Button>
      </Link>
      
      <Card className="p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src={medicine.image}
              alt={medicine.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{medicine.name}</h1>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">{medicine.category}</Badge>
                <Badge
                  variant={medicine.quantity > 0 ? "default" : "destructive"}
                >
                  {medicine.quantity > 0 ? "In Stock" : "Out of Stock"}
                </Badge>
                {medicine.prescriptionRequired && (
                  <Badge variant="destructive">Prescription Required</Badge>
                )}
              </div>
            </div>

            {/* Quick Rating Display */}
            <div className="flex items-center gap-3">
              <StarRating rating={4.3} readonly size="md" />
              <span className="text-sm text-muted-foreground">
                4.3 (127 reviews)
              </span>
            </div>

            <div>
              <p className="text-2xl font-bold text-primary">
                ${medicine.price.toFixed(2)}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{medicine.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Manufacturer Details</h3>
              <p className="text-muted-foreground">{medicine.details}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Additional Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Expiry Date</p>
                  <p className="font-medium">
                    {new Date(medicine.expiryDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Stock Quantity</p>
                  <p className="font-medium">{medicine.quantity} units</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1"
                disabled={medicine.quantity === 0}
                onClick={() => {
                  addToCart(medicine);
                }}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Average Ratings Section */}
      <AverageRatings />

      {/* User Rating Section */}
      <UserRating />

      {/* Suggested Products Section */}
      {allMedicines.length > 0 && (
        <SuggestedProducts 
          currentMedicine={medicine} 
          allMedicines={allMedicines} 
        />
      )}
    </div>
  );
}
