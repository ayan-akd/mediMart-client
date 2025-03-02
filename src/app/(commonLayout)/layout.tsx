import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar session={session} />

      <div className="w-[90%] mx-auto py-8 h-screen">{children}</div>

      <Footer />
    </div>
  );
};

export default CommonLayout;
