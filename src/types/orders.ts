export type TOrder = {
    orderId: string;
    user: string;
    medicine: string;
    quantity: number;
    totalPrice: number;
    city: string;
    address: string;
    status?: 'Pending' | 'Processing' | 'Shipped' | 'Cancelled' | 'Delivered';
    transaction?: {
      paymentId?: string;
      transactionStatus?: string;
      bank_status?: string;
      sp_code?: string;
      sp_message?: string;
      method?: string;
      date_time?: string;
    }
  };
  