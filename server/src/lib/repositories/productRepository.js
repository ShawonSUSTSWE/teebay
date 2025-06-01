class ProductRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async createProduct(data, categoryNames, ownerId) {
    const categoryConnects = categoryNames.map((name) => ({
      name,
    }));

    return this.prisma.product.create({
      data: {
        ...data,
        owner: { connect: { id: ownerId } },
        categories: {
          connect: categoryConnects,
        },
      },
      include: {
        owner: true,
        categories: true,
      },
    });
  }

  async getProductById(id) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        owner: true,
        categories: true,
      },
    });
  }

  async updateProduct(id, data, categoryNames) {
    const updateData = { ...data };

    if (categoryNames) {
      updateData.categories = {
        set: categoryNames.map((name) => ({ name })),
      };
    }

    return this.prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        owner: true,
        categories: true,
      },
    });
  }

  async deleteProduct(id) {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async getAllAvailableProducts() {
    return this.prisma.product.findMany({
      where: {
        status: {
          in: ["AVAILABLE", "RENTED"],
        },
      },
      include: {
        owner: true,
        categories: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getProductsByOwner(ownerId) {
    return this.prisma.product.findMany({
      where: { ownerId },
      include: {
        categories: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async updateProductStatus(productId, newStatus) {
    return this.prisma.product.update({
      where: { id: productId },
      data: { status: newStatus },
    });
  }
}

export default ProductRepository;
