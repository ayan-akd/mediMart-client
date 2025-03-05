import { ContentLayout } from "@/components/admin-panel/content-layout";
import OrderHistoryManagement from "@/components/modules/user/OrderHistoryManagement";
import { getMyOrders } from "@/services/OrderService";
import { getMe } from "@/services/UserService";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "MediMart | Order History",
    description:
      "View your order history and track the status of your past orders in the MediMart system.",
  };
export default async function OrderHistoryPage() {
    const {data} = await getMe();
    const {data:res} = await getMyOrders(data?._id);
    return (
        <ContentLayout title="Order History">
            <OrderHistoryManagement orders={res} />
        </ContentLayout>
    );
}