import TransactionRequestBodyTypeMap from "../lib/constants/TransactionRequestBodyTypeMap.js";
import TransactionType from "../lib/constants/TransactionType.js";

class TransactionRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async createBuyTransaction({ productId, buyerId, sellerId, amount }) {
    return this.prisma.transaction.create({
      data: {
        productId,
        buyerId,
        sellerId,
        type: TransactionType.BUY,
        amount,
      },
      include: {
        product: true,
        buyer: true,
        seller: true,
      },
    });
  }

  async createRentTransaction({
    productId,
    buyerId,
    sellerId,
    amount,
    startDate,
    endDate,
    rentDuration,
  }) {
    return this.prisma.transaction.create({
      data: {
        productId,
        buyerId,
        sellerId,
        type: TransactionType.RENT,
        startDate,
        endDate,
        rentDuration,
        amount,
      },
      include: {
        product: true,
        buyer: true,
        seller: true,
      },
    });
  }

  async getUserTransactionsByType(userId, type) {
    const { type: transactionType, role } = TransactionRequestBodyTypeMap[type];
    return this.prisma.transaction.findMany({
      where: {
        type: transactionType,
        [role]: userId,
      },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getLatestRentEndDate(productId) {
    const latestRentTransaction = await this.prisma.transaction.findFirst({
      where: {
        productId,
        type: "RENT",
        endDate: {
          not: null,
        },
      },
      orderBy: {
        endDate: "desc",
      },
      select: {
        endDate: true,
      },
    });

    return latestRentTransaction?.endDate || null;
  }

  async getRentalOverlap({ end, start, productId }) {
    return await this.prisma.transaction.findFirst({
      where: {
        productId,
        type: TransactionType.RENT,
        startDate: { lte: end },
        endDate: { gte: start },
      },
    });
  }
}

export default TransactionRepository;
