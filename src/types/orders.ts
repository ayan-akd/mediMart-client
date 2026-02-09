import { IMedicine } from "./medicine";
import { IUser } from "./user";

export type TOrder = {
  _id?: string;
  orderId: string;
  user: IUser;
  medicines: { medicine: IMedicine; quantity: number }[];
  quantity: number;
  totalPrice: number;
  city: string;
  address: string;
  prescription?: string;
  createdAt?: Date;
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
