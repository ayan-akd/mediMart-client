import { IMedicine } from "./medicine";

export type TOrder = {
  _id?: string;
  orderId: string;
  user: string;
  medicines: { medicine: IMedicine; quantity: number }[];
  quantity: number;
  totalPrice: number;
  city: string;
  address: string;
  prescription?: string;
  status?:
    | "Pending"
    | "Paid"
    | "Failed"
    | "Processing"
    | "Shipped"
    | "Cancelled"
    | "Delivered";
  transaction?: {
    paymentId?: string;
    transactionStatus?: string;
    bank_status?: string;
    sp_code?: string;
    sp_message?: string;
    method?: string;
    date_time?: string;
  };
};
