import MedicineDetailsCard from "@/components/modules/shop/MedicineDetailsCard";
import { getAllMedicine, getSingleMedicine } from "@/services/medicines";

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
    const { data: allMedicines } = await getAllMedicine();
    return (
        <MedicineDetailsCard medicine={medicine.data} allMedicines={allMedicines.data} />
    );
}