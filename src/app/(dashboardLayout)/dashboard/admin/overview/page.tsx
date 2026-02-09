import { ContentLayout } from "@/components/admin-panel/content-layout";
import AdminOverview from "@/components/modules/admin/overview/AdminOverview";
import { getAllMedicine } from "@/services/medicines";

import { getAllOrders } from "@/services/OrderService";
import { getAllUsers } from "@/services/UserService";

export default async function OverViewPage() {
  // Fetch all necessary data
  const [medicinesResponse, ordersResponse, usersResponse] = await Promise.all([
    getAllMedicine(),
    getAllOrders(),
    getAllUsers(),
  ]);

  const medicines = medicinesResponse?.data?.data || [];
  const orders = ordersResponse?.data || [];
  const users = usersResponse?.data || [];

  return (
    <ContentLayout title="Overview">
      <AdminOverview 
        medicines={medicines}
        orders={orders}
        users={users}
      />
    </ContentLayout>
  );
}
