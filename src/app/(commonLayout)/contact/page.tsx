import ContactComponent from "@/components/modules/contact/ContactComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "MediMart | Contact Us",
    description:
      "Contact us at MediMart for any inquiries, feedback, or assistance. We're here to help you with your healthcare needs. Reach out to us through our contact form or phone number.",
  };

export default function ContactPage() {
    return (
        <ContactComponent />
    );
}