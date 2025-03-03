export interface IUser {
  _id?: string;
  userId?: string;
  name: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  isActive?: boolean;
  role?: "customer" | "admin";
  status?: "active" | "blocked";
  isDeleted?: boolean;
  profileImage?: string;
  iat?: number;
  exp?: number;
}
