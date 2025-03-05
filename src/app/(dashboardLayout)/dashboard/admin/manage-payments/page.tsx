import { ContentLayout } from "@/components/admin-panel/content-layout";
import ManagePayment from "@/components/modules/admin/order/ManagePayment";
import { getAllOrders } from "@/services/OrderService";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "MediMart | Manage Payments",
    description:
      "Efficient payment management dashboard for administrators. View and manage customer payments, track payment status, and handle refunds or adjustments in the MediMart system.",
  };
export default async function ManagePaymentsPage() {
     const {data} = await getAllOrders();
    return (
        <ContentLayout title="Manage Payments">
            <ManagePayment orders={data} />
        </ContentLayout>
    );
}