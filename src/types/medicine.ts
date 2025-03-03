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
  };