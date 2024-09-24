export type TransactionState = 'Normal' | 'Fraudulent' | 'Suspicious' | 'Pending';


export default interface Transaction {
  id?: number;  // Optional if generated automatically
  userId?: string;
  amount?: number;
  device_id?: string;
  merchant_id?: number;
  operation_start_date?: Date;
  operation_end_date?: Date;
  ip_address?: string;
  http_service_name?: string;
  feesPaymentMode?: number;
  payerFees?: number;
  state: TransactionState;
}


