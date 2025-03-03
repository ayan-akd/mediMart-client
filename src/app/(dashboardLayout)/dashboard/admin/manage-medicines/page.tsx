import { ContentLayout } from "@/components/admin-panel/content-layout";
import MedicineManagement from "@/components/modules/admin/Medicine/MedicineManagement";
import { getAllMedicine } from "@/services/medicines";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MediMart | Manage Medicines",
  description:
    "Comprehensive medicine management dashboard for administrators. Add new medicines, update inventory, manage pricing, track stock levels, and ensure quality control of pharmaceutical products in the MediMart system.",
};
export default async function ManageMedicinesPage() {
  const { data } = await getAllMedicine();
  return (
    <ContentLayout title="Manage Medicines">
      <MedicineManagement medicines= {data.data}/>
    </ContentLayout>
  );
}
