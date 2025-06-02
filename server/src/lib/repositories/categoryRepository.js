class CategoryRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async findAll() {
    return this.prisma.category.findMany();
  }
}

export default CategoryRepository;
