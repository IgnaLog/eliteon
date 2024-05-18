import { User } from "../entities/user";

export interface IUserService {
  registerUser(email: string, password: string): Promise<void>;
  getAllUsers(): Promise<User[]>;
  getUserById(id: number): Promise<User | null>;
  deleteUserById(id: number): Promise<void>;
}
