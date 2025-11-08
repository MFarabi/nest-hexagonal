export type OrderRepositorySaveDTO = {
  id: string;
  customerId: string;
  totalAmount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
