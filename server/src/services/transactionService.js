import TransactionRepository from "../repositories/transactionRepository.js";

class TransactionService {
  constructor(prisma) {
    this.transactionRepository = new TransactionRepository(prisma);
  }

  async buyProduct({ productId }, buyerId, productService) {
    const product = await productService.getProductById(productId);
    if (!product) throw new Error("Product not found");
    if (product.status !== "AVAILABLE")
      throw new Error("Product not available for purchase");

    const transaction = await this.transactionRepository.createBuyTransaction({
      productId,
      buyerId,
      sellerId: product.ownerId,
      amount: product.price,
    });

    await productService.updateProductStatus(productId, "SOLD");
    return transaction;
  }

  async rentProduct(
    { productId, startDate, endDate },
    buyerId,
    productService
  ) {
    const product = await productService.getProductById(productId);
    if (!product) throw new Error("Product not found");
    if (product.status !== "AVAILABLE")
      throw new Error("Product not available for rent");

    const durationInMs = new Date(endDate) - new Date(startDate);
    if (durationInMs <= 0) throw new Error("Invalid rental period");

    const transaction = await this.transactionRepository.createRentTransaction({
      productId,
      buyerId,
      sellerId: product.ownerId,
      amount: product.rentalPrice,
      startDate,
      endDate,
      rentDuration: product.rentDuration,
    });
    return transaction;
  }

  async getUserTransactions(userId) {
    return this.transactionRepository.findByUser(userId);
  }
}

export default TransactionService;
