"use server";
import { IMedicine } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// get all medicine
export const getAllMedicine = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();

  if (query?.price) {
    params.append("minPrice", "0");
    params.append("maxPrice", query?.price.toString());
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/medicine?limit=${limit}&page=${page}&${params}`,
      {
        next: {
          tags: ["Medicine"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get single medicine
export const getSingleMedicine = async (medicineId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/medicine/${medicineId}`,
      {
        next: {
          tags: ["Medicine"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// add medicine
export const addMedicine = async (medicineData: IMedicine): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/medicine`, {
      method: "POST",
      body: JSON.stringify(medicineData),
      headers: {
        "Content-type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("Medicine");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// update medicine
export const updateMedicine = async (
  medicineData: IMedicine,
  medicineId: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/medicine/${medicineId}`,
      {
        method: "PATCH",
        body: JSON.stringify(medicineData),
        headers: {
          "Content-type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("Medicine");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteMedicine = async (
    medicineId: string
  ): Promise<any> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/medicine/${medicineId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: (await cookies()).get("accessToken")!.value,
          },
        }
      );
      revalidateTag("Medicine");
      return res.json();
    } catch (error: any) {
      return Error(error);
    }
  };
