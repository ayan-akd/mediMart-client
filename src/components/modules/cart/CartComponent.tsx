"use client";
import CartCard from "@/components/modules/cart/CartCard";
import OrderSummaryCard from "@/components/modules/cart/OrderSummaryCard";
import { Button } from "@/components/ui/button";
import { orderedMedicineSelector } from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/hook";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";


export default function CartComponent() {
  const cartItems = useAppSelector(orderedMedicineSelector);
  if (cartItems.length === 0) {
    return (
      <div className="container py-32">
        <div className="flex flex-col items-center justify-center text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-6" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven&apos;t added any medicines to your cart yet.
          </p>
          <Link href="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items - Left Side */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartCard key={item._id} item={item} />
          ))}
        </div>

        {/* Order Summary - Right Side */}
        <OrderSummaryCard itemCarts={cartItems} />
      </div>
    </div>
  );
}
