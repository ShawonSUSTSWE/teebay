import ProductStatus from "../lib/constants/ProductStatus.js";

class ProductRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async createProduct(data, categoryNames, ownerId) {
    return this.prisma.product.create({
      data: {
        ...data,
        owner: { connect: { id: ownerId } },
        categories: categoryNames,
      },
      include: {
        owner: true,
      },
    });
  }

  async getProductById(id) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        owner: true,
      },
    });
  }

  async updateProduct(id, data, categoryNames) {
    const updateData = { ...data };

    if (categoryNames) {
      updateData.categories = categoryNames;
    }

    return this.prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        owner: true,
      },
    });
  }

  async deleteProduct(id) {
    return this.prisma.product.update({
      where: { id },
      data: { status: ProductStatus.ARCHIVED },
    });
  }

  async getAllAvailableProducts() {
    return this.prisma.product.findMany({
      where: {
        status: {
          in: [ProductStatus.AVAILABLE, ProductStatus.RENTED],
        },
      },
      include: {
        owner: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getProductsByOwner(ownerId) {
    return this.prisma.product.findMany({
      where: { ownerId, status: { not: ProductStatus.ARCHIVED } },
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
