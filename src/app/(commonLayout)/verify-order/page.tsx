import VerifyOrder from "@/components/modules/cart/VerifyOrder";
import { verifyOrderService } from "@/services/OrderService";
import { Metadata } from "next";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export const metadata: Metadata = {
  title: "MediMart | Order Verification",
  description:
    "Verify your order at MediMart. Enter your order ID to track your order status, view order details, and ensure a smooth shopping experience.",
};
export default async function VerifyOrderPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { order_id: orderId } = await searchParams;
  const {data} = await verifyOrderService(orderId as string);
  return (
    <>
      <VerifyOrder orderId={orderId as string} data={data[0]} />
    </>
  );
}
