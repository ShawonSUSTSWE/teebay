import TransactionType from "../lib/constants/TransactionType.js";

class TransactionRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async createBuyTransaction({ productId, buyerId, sellerId, amount }) {
    return prisma.transaction.create({
      data: {
        productId,
        buyerId,
        sellerId,
        type: TransactionType.BUY,
        amount,
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
    return prisma.transaction.create({
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
    });
  }

  async getTransactionsByUser(userId) {
    return prisma.transaction.findMany({
      where: {
        OR: [{ buyerId: userId }, { sellerId: userId }],
      },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

export default TransactionRepository;
