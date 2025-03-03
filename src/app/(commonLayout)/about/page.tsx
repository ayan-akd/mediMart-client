import AboutComponent from "@/components/modules/about/AboutComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "MediMart | About Us",
    description:
      "MediMart is revolutionizing healthcare access through our innovative online pharmacy platform. We are dedicated to providing high-quality healthcare products and services to our customers. Our mission is to make healthcare accessible and convenient for everyone.",
  };
  

export default function AboutPage() {
    return (
        <AboutComponent />
    );
}