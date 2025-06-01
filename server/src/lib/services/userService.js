import { generateToken } from "../../config/jwt.js";
import UserRepository from "../repositories/userRepository.js";

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

  async createUser({
    email,
    password,
    firstName,
    lastName,
    address,
    phoneNumber,
  }) {
    const data = {
      email,
      password,
      firstName,
      lastName,
      address,
      phoneNumber,
    };
    return await this.userRepository.createUser(data);
  }

  async validateUser(email, password) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user || user.password !== password) {
      throw new Error("Invalid email or password");
    }
    return user;
  }

  async generateToken(user, res) {
    const token = generateToken(user, res);
    return { token };
  }
}

export default UserService;
