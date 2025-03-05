import { ContentLayout } from "@/components/admin-panel/content-layout";
import OrderManagement from "@/components/modules/admin/order/OrderManagement";
import { getAllOrders } from "@/services/OrderService";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "MediMart | Manage Orders",
    description:
      "Efficient order management dashboard for administrators. View and manage customer orders, track order status, and handle order cancellations or modifications in the MediMart system.",
  };
export default async function ManageOrdersPage() {
        const {data} = await getAllOrders();
    return (
        <ContentLayout title="Manage Orders">
            <OrderManagement orders={data} />
        </ContentLayout>
    );
}