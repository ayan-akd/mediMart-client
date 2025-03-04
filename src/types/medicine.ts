export const medicineCategories = [
  "Pain Relievers",
  "Antibiotics",
  "Antivirals",
  "Antifungals",
  "Allergy Medicines",
  "Digestive Medicines",
  "Cold & Flu",
  "Diabetes Medicines",
  "Blood Pressure Medicines",
  "Heart Medicines",
  "Mental Health",
  "Hormones & Steroids",
  "Skin Care",
  "Eye & Ear Care",
  "Cancer Medicines",
  "Vitamins & Supplements",
];

export const medicineCategoryOptions = medicineCategories.map((category) => ({
  label: category, 
  value: category,
}));

export interface IMedicine {
  _id?: string;
  name: string;
  description: string;
  details: string;
  price: number;
  quantity: number;
  inStock?: boolean;
  image: string;
  prescriptionRequired?: boolean;
  expiryDate: Date;
  isDeleted?: boolean;
  category: (typeof medicineCategories)[number];
  createdAt?: Date;
}


