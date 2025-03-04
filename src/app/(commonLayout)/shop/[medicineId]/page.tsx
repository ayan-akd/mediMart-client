import MedicineDetailsCard from "@/components/modules/shop/MedicineDetailsCard";
import { getSingleMedicine } from "@/services/medicines";

export const generateMetadata = async ({
    params,
  }: {
    params: Promise<{ medicineId: string }>;
  }) => {
    const { medicineId } = await params;
    const {data} = await getSingleMedicine(medicineId);
    
    return {
      title: data?.name,
      description: data?.description,
    };
  }

export default async function MedicineDetails({ params }: { params: Promise<{ medicineId: string }> }) {
    const { medicineId } = await params;
    const medicine = await getSingleMedicine(medicineId);
    return (
        <MedicineDetailsCard medicine={medicine.data} />
    );
}