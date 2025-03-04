/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { getValidToken } from "@/lib/VerifyToken";

// Get all orders
export const getAllOrders = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders`, {
      next: {
        tags: ["orders"],
      },
    });
    return await res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

// Create order
export const createOrder = async (orderData: any): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders`, {
      method: "POST",
      body: JSON.stringify(orderData),
      headers: {
      "Content-type": "application/json",
        Authorization: token,
      },
    });

    revalidateTag("orders");

    return res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

// Delete order
export const deleteOrder = async (orderId: string): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    revalidateTag("orders");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const verifyOrderService = async (paymentId: string): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/verify/${paymentId}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    return res.json();
  } catch (error: any) {
    return new Error(error);
  }
};
