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
}

export default UserService;
