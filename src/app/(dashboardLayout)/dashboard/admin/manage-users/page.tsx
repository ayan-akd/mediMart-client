import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "MediMart | Manage Users",
    description:
      "User management dashboard for administrators. Manage user roles, and ensure user access control in the MediMart system.",
  };
export default function ManageUsersPage() {
    return (
        <ContentLayout title="Manage Users">
            <h1>This is the ManageUsersPage component</h1>
        </ContentLayout>
    );
}