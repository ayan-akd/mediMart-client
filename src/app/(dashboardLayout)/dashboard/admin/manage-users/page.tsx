import { ContentLayout } from "@/components/admin-panel/content-layout";
import UsersManagement from "@/components/modules/admin/users/UsersManagement";
import { getAllUsers } from "@/services/UserService";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "MediMart | Manage Users",
    description:
      "User management dashboard for administrators. Manage user roles, and ensure user access control in the MediMart system.",
  };
export default async function ManageUsersPage() {
    const {data} = await getAllUsers();
    return (
        <ContentLayout title="Manage Users">
            <UsersManagement users={data} />
        </ContentLayout>
    );
}