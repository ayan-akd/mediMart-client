/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/VerifyToken";
import { IUser } from "@/types";
import { revalidateTag } from "next/cache";


// Get all users
export const getAllUsers = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users`, {
      next: {
        tags: ["Users"],
      },
      headers: {
        Authorization: token,
      }
    });
    return await res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getMe = async () => {
  const token = await getValidToken();
  if (!token) {
    return null;
  }
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/me`, {
      next: {
        tags: ["Users"],
      },
      headers: {
        Authorization: token,
      }
    });
    return await res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

export const updateUser = async (userId: string, userData:IUser): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/update-user/${userId}`, {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    });

    revalidateTag("Users");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const changeStatus = async (userId: string, status:string): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/change-status/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    });

    revalidateTag("Users");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};