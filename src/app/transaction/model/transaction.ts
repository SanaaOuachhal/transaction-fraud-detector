export type TransactionType = 'TRANSFER' | 'CASH_OUT' | 'DEBIT' | 'PAYMENT' | 'CASH_IN';
export type TransactionState = 'Normal' | 'Fraudulent'| 'Suspicious'




export interface Transaction {
  id?: number;
  step?: number;
  amount?: number;
  nameOrig?: string;
  oldbalanceOrg?: number;
  newbalanceOrig?: number;
  nameDest?: string;
  oldbalanceDest?: number;
  newbalanceDest?: number;
  type?: TransactionType;
  state?: TransactionState;
}
