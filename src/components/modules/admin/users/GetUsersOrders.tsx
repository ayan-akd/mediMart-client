"use client";

import { getMyOrders } from "@/services/OrderService";
import { useEffect, useState } from "react";

const fetchOrdersFromApi = async (userId: string) => {
  const response = await getMyOrders(userId);
  if (response.success) {
    return response.data;
  }
  throw new Error("Failed to fetch orders");
};

export const GetUsersOrders = ({ userId }: { userId: string }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await fetchOrdersFromApi(userId);
        setOrders(data);
      } catch (err: any) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      {orders.length > 0 ? (
        <div>
          <p className="font-semibold">Orders:</p>
          <ul>
            {orders.map((order, index) => (
              <li key={index}>
                {index+1} - {order.orderId}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h1 className="font-semibold">No orders found for this user.</h1>
      )}
    </div>
  );
};
