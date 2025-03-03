import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";


const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="w-[90%] mx-auto py-8">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
