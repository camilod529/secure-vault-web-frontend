export interface Transaction {
  id: string;
  name: string;
  amount: number;
  currency: string;
  created_at: Date;
  updated_at?: Date;
  deleted: boolean;
  createdBy: User;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  deleted: boolean;
}
