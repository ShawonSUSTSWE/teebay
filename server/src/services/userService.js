import { clearCookie, generateToken } from "../config/jwt.js";
import UserRepository from "../repositories/userRepository.js";
import { PRISMA_DUPLICATE_ERROR_CODE } from "../lib/constants/ApplicationConstants.js";

class UserService {
  constructor(prisma) {
    this.userRepository = new UserRepository(prisma);
  }

  async getUsers() {
    return await this.userRepository.getUsers();
  }

  async getUserById(id) {
    return await this.userRepository.getUserById(id);
  }

  async createUser(userData) {
    try {
      return await this.userRepository.createUser(userData);
    } catch (error) {
      if (error.code === PRISMA_DUPLICATE_ERROR_CODE) {
        throw new Error("Email already exists");
      }
      throw error;
    }
  }

  async validateUser(email, password) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user || user.password !== password) {
      throw new Error("Invalid email or password");
    }
    return user;
  }

  async generateToken(user, res) {
    return generateToken(user, res);
  }

  async logout(res) {
    return clearCookie(res);
  }
}

export default UserService;
