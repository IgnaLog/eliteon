import { IUserWithRoles } from "../entities/IUserWithRole";
import { User } from "../entities/user";

export interface IUserRepository {
  getAllUsers(): Promise<User[]>;
  getUserById(id: number): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserWithRolesByEmail(email: string): Promise<IUserWithRoles | null>;
  getUserWithRolesByToken(token: string): Promise<IUserWithRoles | null>;
  createUserWithRole(email: string, password: string): Promise<void>;
  deleteUserById(id: number): Promise<void>;
}
