import { ContentLayout } from "@/components/admin-panel/content-layout";
import ProfileManagement from "@/components/modules/profile/ProfileManagement";
import { getMe } from "@/services/UserService";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "MediMart | Profile",
    description:
      "Manage your account settings, view your order history, and more. Update your profile information and preferences to personalize your MediMart experience.",
  };
export default async function ProfilePage() {
    const {data} = await getMe();
    return (
        <ContentLayout title="Profile">
            <ProfileManagement data={data} />
        </ContentLayout>
    );
}