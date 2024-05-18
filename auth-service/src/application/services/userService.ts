import { IUserService } from "../../domain/services/IUserService";
import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { AppError } from "../errors/appError";
import bcrypt from "bcrypt";

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async registerUser(email: string, password: string): Promise<void> {
    // Check for duplicate email in the db
    const duplicate = await this.userRepository.getUserByEmail(email);
    if (duplicate) {
      throw new AppError(409, "User already exists"); // Conflict
    }
    // Encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10); // 10 (salt) sets of random characters to form a hash with the password

    // Create and store the new user with their respective initial role
    await this.userRepository.createUserWithRole(email, hashedPwd);
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.getAllUsers();
    if (!users) {
      throw new AppError(204, "No users found");
    }
    return users;
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new AppError(204, `User ID ${id} not found`);
    }
    return user;
  }

  async deleteUserById(id: number): Promise<void> {
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new AppError(204, `User ID ${id} not found`);
    }

    await this.userRepository.deleteUserById(id);
  }
}
