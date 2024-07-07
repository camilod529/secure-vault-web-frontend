export interface Transaction {
  id: string;
  name: string;
  amount: number;
  currency: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  createdBy: User;
}
interface User {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  deleted: boolean;
}
