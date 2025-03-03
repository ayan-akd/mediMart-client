import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "MediMart | Manage Payments",
    description:
      "Efficient payment management dashboard for administrators. View and manage customer payments, track payment status, and handle refunds or adjustments in the MediMart system.",
  };
export default function ManagePaymentsPage() {
    return (
        <ContentLayout title="Manage Payments">
            <h1>This is the ManagePaymentsPage component</h1>
        </ContentLayout>
    );
}