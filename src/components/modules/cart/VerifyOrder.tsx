"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hook";
import { clearCart } from "@/redux/features/cartSlice";

interface OrderData {
    id: number;
    order_id: string;
    currency: string;
    amount: number;
    payable_amount: number;
    discsount_amount: number | null;
    disc_percent: number;
    received_amount: string;
    usd_amt: number;
    usd_rate: number;
    is_verify: number;
    card_holder_name: string | null;
    card_number: string | null;
    phone_no: string;
    bank_trx_id: string;
    invoice_no: string;
    bank_status: string;
    customer_order_id: string;
    sp_code: string;
    sp_message: string;
    name: string;
    email: string;
    address: string;
    city: string;
    value1: string | null;
    value2: string | null;
    value3: string | null;
    value4: string | null;
    transaction_status: string | null;
    method: string;
    date_time: string;
  }

export default function VerifyOrder({
  orderId,
  data: orderData,
}: {
  orderId: string;
  data: OrderData;
}) {

  const dispatch = useAppDispatch();
  dispatch(clearCart());

  if (!orderId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-xl font-semibold">Invalid Order ID</h2>
        <p className="text-muted-foreground">No order information found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Order Verification</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <p className="font-semibold">Order ID:</p>
              <p>{orderData?.order_id}</p>
              <p className="font-semibold">Amount:</p>
              <p>
                {orderData?.currency} {orderData?.amount?.toFixed(2)}
              </p>
              <p className="font-semibold">Status:</p>
              <Badge
                variant={
                  orderData?.bank_status === "Success"
                    ? "default"
                    : orderData?.bank_status === "Failed"
                    ? "destructive"
                    : "default"
                }
              >
                {orderData?.bank_status}
              </Badge>
              <p className="font-semibold">Date:</p>
              <p>{new Date(orderData?.date_time).toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <p className="font-semibold">Method:</p>
              <p>{orderData?.method}</p>
              <p className="font-semibold">Transaction ID:</p>
              <p>{orderData?.bank_trx_id}</p>
              <p className="font-semibold">Invoice No:</p>
              <p>{orderData?.invoice_no}</p>
              <p className="font-semibold">SP Code:</p>
              <p>{orderData?.sp_code}</p>
              <p className="font-semibold">SP Message:</p>
              <p>{orderData?.sp_message}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <p className="font-semibold">Name:</p>
              <p>{orderData?.name}</p>
              <p className="font-semibold">Email:</p>
              <p>{orderData?.email}</p>
              <p className="font-semibold">Phone:</p>
              <p>{orderData?.phone_no}</p>
              <p className="font-semibold">Address:</p>
              <p>{orderData?.address}</p>
              <p className="font-semibold">City:</p>
              <p>{orderData?.city}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Link href="/dashboard/user/orders">
              <Button>View Orders</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
