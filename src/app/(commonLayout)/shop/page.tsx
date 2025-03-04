import AllMedicines from "@/components/modules/shop/AllMedicines";
import { getAllMedicine } from "@/services/medicines";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "MediMart | Shop",
    description:
      "Explore our wide range of healthcare products and services at MediMart. Shop for prescription medications, over-the-counter drugs, medical equipment, and more. We offer a convenient and secure online shopping experience.",
  };
export default async function ShopPage() {
    const {data} = await getAllMedicine();
    return (
        <div>
            <AllMedicines data={data.data} />
        </div>
    );
}