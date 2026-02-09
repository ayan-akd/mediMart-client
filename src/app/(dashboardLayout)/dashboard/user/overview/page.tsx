import { ContentLayout } from "@/components/admin-panel/content-layout";
import UserOverview from "@/components/modules/admin/overview/UserOverview";
import { getMyOrders } from "@/services/OrderService";
import { getMe } from "@/services/UserService";


export default async function UserOverviewPage() {
    const {data} = await getMe();
  // Fetch user-specific data
  const [ordersResponse] = await Promise.all([
    getMyOrders(data._id),
  ]);

  const orders = ordersResponse?.data || [];

  return (
    <ContentLayout title="Overview">
      <UserOverview 
        orders={orders}
      />
    </ContentLayout>
  );
}
