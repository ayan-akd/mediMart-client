import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "MediMart | Profile",
    description:
      "Manage your account settings, view your order history, and more. Update your profile information and preferences to personalize your MediMart experience.",
  };
export default function ProfilePage() {
    return (
        <ContentLayout title="Profile">
            <h1>This is the ProfilePage component</h1>
        </ContentLayout>
    );
}