class UserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async getUserById(id) {
    return await this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  async createUser(data) {
    return await this.prisma.user.create({
      data: data,
    });
  }

  async updateUser(id, data) {
    return await this.prisma.user.update({
      where: { id: id },
      data: data,
    });
  }

  async deleteUser(id) {
    return await this.prisma.user.delete({
      where: { id: id },
    });
  }

  async getUserByEmail(email) {
    return await this.prisma.user.findUnique({
      where: { email: email },
    });
  }
}

export default UserRepository;
