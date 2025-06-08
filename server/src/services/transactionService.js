import { ProductStatus } from "@prisma/client";
import TransactionRepository from "../repositories/transactionRepository.js";
import ProductService from "./productService.js";

class TransactionService {
  constructor(prisma) {
    this.transactionRepository = new TransactionRepository(prisma);
  }

  async buyProduct({ productId }, buyerId, productService) {
    const product = await productService.getProductById(productId);
    if (!product) throw new Error("Product not found");
    if (product.status !== ProductStatus.AVAILABLE)
      throw new Error("Product not available for purchase");

    const result = await this.transactionRepository.prisma.$transaction(
      async (tx) => {
        const transactionRepo = new TransactionRepository(tx);
        const transactionProductService = new ProductService(tx);

        const transaction = await transactionRepo.createBuyTransaction({
          productId,
          buyerId,
          sellerId: product.ownerId,
          amount: product.price,
        });

        await transactionProductService.updateProductStatus(
          productId,
          ProductStatus.SOLD
        );
        return transaction;
      }
    );

    return result;
  }

  async rentProduct(
    { productId, startDate, endDate },
    buyerId,
    productService
  ) {
    const product = await productService.getProductById(productId);
    if (!product) throw new Error("Product not found");
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInMs = end.getTime() - start.getTime();
    if (durationInMs < 0) throw new Error("Invalid rental period");

    if (product.status === ProductStatus.RENTED) {
      const overlappingRental =
        await this.transactionRepository.getRentalOverlap({
          end,
          start,
          productId,
        });

      if (overlappingRental) {
        throw new Error("Product is already rented during this period");
      }
    } else if (product.status !== ProductStatus.AVAILABLE) {
      throw new Error("Product not available for rent");
    }

    const result = await this.transactionRepository.prisma.$transaction(
      async (tx) => {
        const transactionRepo = new TransactionRepository(tx);
        const transactionProductService = new ProductService(tx);

        const transaction = await transactionRepo.createRentTransaction({
          productId,
          buyerId,
          sellerId: product.ownerId,
          amount: product.rentalPrice,
          startDate,
          endDate,
          rentDuration: product.rentDuration,
        });

        await transactionProductService.updateProductStatus(
          productId,
          ProductStatus.RENTED
        );
        return transaction;
      }
    );

    return result;
  }

  async getUserTransactions(userId, transactionType) {
    return this.transactionRepository.getUserTransactionsByType(
      userId,
      transactionType
    );
  }

  async getLatestRentEndDate(productId) {
    return this.transactionRepository.getLatestRentEndDate(productId);
  }
}

export default TransactionService;
