import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "MediMart | Order History",
    description:
      "View your order history and track the status of your past orders in the MediMart system.",
  };
export default function OrderHistoryPage() {
    return (
        <ContentLayout title="Order History">
            <h1>This is the OrderHistoryPage component</h1>
        </ContentLayout>
    );
}