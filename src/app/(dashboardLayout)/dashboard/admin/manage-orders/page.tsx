import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "MediMart | Manage Orders",
    description:
      "Efficient order management dashboard for administrators. View and manage customer orders, track order status, and handle order cancellations or modifications in the MediMart system.",
  };
export default function ManageOrdersPage() {
    return (
        <ContentLayout title="Manage Orders">
            <h1>This is the ManageOrdersPage component</h1>
        </ContentLayout>
    );
}