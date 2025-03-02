import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import logo from "@/assets/logo.png";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white dark:bg-gray-950">
      <div className="w-[90%] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image src={logo} alt="MediMart Logo" width={40} height={40} className="w-8 h-8" />
              <span className="text-xl font-bold dark:text-white">MediMart</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your trusted online pharmacy partner. Quality medicines delivered to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 dark:text-gray-100">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link href="/shop" className="text-gray-600 hover:text-[#E11D48] dark:text-gray-400 dark:hover:text-[#E11D48] text-sm">Shop</Link>
              <Link href="/prescriptions" className="text-gray-600 hover:text-[#E11D48] dark:text-gray-400 dark:hover:text-[#E11D48] text-sm">Upload Prescription</Link>
              <Link href="/orders" className="text-gray-600 hover:text-[#E11D48] dark:text-gray-400 dark:hover:text-[#E11D48] text-sm">Track Order</Link>
              <Link href="/about" className="text-gray-600 hover:text-[#E11D48] dark:text-gray-400 dark:hover:text-[#E11D48] text-sm">About Us</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 dark:text-gray-100">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MdPhone className="h-5 w-5 text-[#E11D48]" />
                <span className="text-sm">+1 234 567 890</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MdEmail className="h-5 w-5 text-[#E11D48]" />
                <span className="text-sm">support@medimart.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MdLocationOn className="h-5 w-5 text-[#E11D48]" />
                <span className="text-sm">123 Health Street, Medical City</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 dark:text-gray-100">Follow Us</h3>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:text-[#E11D48]" asChild>
                <Link href="#" target="_blank">
                  <FaFacebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-[#E11D48]" asChild>
                <Link href="#" target="_blank">
                  <FaInstagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-[#E11D48]" asChild>
                <Link href="#" target="_blank">
                  <FaTwitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} MediMart. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
              <Link href="/privacy" className="hover:text-[#E11D48]">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#E11D48]">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
