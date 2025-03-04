import CartComponent from "@/components/modules/cart/CartComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MediMart | Cart",
  description:
    "View and manage your medicine cart at MediMart. Add, remove, or update quantities of medicines, apply discounts, and proceed to checkout. Your one-stop destination for convenient online medicine shopping.",
};

export default function CartPage() {
  return <CartComponent />;
}
