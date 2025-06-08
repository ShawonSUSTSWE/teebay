import { ProductStatus } from "@prisma/client";
import ProductRepository from "../repositories/productRepository.js";

class ProductService {
  constructor(prisma) {
    this.productRepository = new ProductRepository(prisma);
  }

  async createProduct(data, categoryNames, ownerId) {
    try {
      return await this.productRepository.createProduct(
        data,
        categoryNames,
        ownerId
      );
    } catch (error) {
      throw new Error("Failed to create product: " + error.message);
    }
  }

  async getProductById(id) {
    return await this.productRepository.getProductById(id);
  }

  async updateProduct(id, data, categoryNames, user) {
    try {
      await this.checkProductOwnership(id, user.id);

      return await this.productRepository.updateProduct(
        id,
        data,
        categoryNames
      );
    } catch (error) {
      throw new Error("Failed to update product: " + error.message);
    }
  }

  async deleteProduct(id, user) {
    const product = await this.checkProductOwnership(id, user.id);
    if (product.status === ProductStatus.RENTED) {
      throw new Error(
        "The product can not be deleted while it is being rented"
      );
    }

    return await this.productRepository.deleteProduct(id);
  }

  async getAllAvailableProducts() {
    return await this.productRepository.getAllAvailableProducts();
  }

  async getProductsByOwner(ownerId) {
    return await this.productRepository.getProductsByOwner(ownerId);
  }

  async updateProductStatus(productId, newStatus) {
    try {
      return await this.productRepository.updateProductStatus(
        productId,
        newStatus
      );
    } catch (error) {
      throw new Error("Failed to update product status: " + error.message);
    }
  }

  async checkProductOwnership(productId, userId) {
    const product = await this.productRepository.getProductById(productId);
    if (
      !product ||
      product.ownerId !== userId ||
      product.status === ProductStatus.ARCHIVED
    ) {
      throw new Error("You are not authorized to modify this product.");
    }
    if (product.status === ProductStatus.SOLD) {
      throw new Error(
        "This product has already been sold. You can no longer modify this product"
      );
    }
    return product;
  }
}

export default ProductService;
