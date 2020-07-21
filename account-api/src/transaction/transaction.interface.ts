export interface Transaction {
  id: string;
  type: string;
  amount: number;
  effectiveDate: Date;
}