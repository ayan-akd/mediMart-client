import CategoriesComponent from "@/components/modules/home/Categories";
import FeaturedSection from "@/components/modules/home/FeaturedSection";
import HealthTips from "@/components/modules/home/HealthTips";
import HeroSection from "@/components/modules/home/HeroSection";
import LiveChat from "@/components/modules/home/LiveChat";
import NewsLetter from "@/components/modules/home/NewsLetter";
import Offers from "@/components/modules/home/Offers";
import Reviews from "@/components/modules/home/Reviews";
import { getAllMedicine } from "@/services/medicines";

export default async function HomePage() {
  const { data: medicines } =await getAllMedicine();
  return (
   <div>
   <HeroSection />
   <FeaturedSection data={medicines.data} />
   <CategoriesComponent />
   <Offers />
   <HealthTips />
   <Reviews />
   <NewsLetter />
   <LiveChat />
   </div>
  );
}
