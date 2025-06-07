import TransactionType from "./TransactionType.js";

export default {
  BOUGHT: { type: TransactionType.BUY, role: "buyerId" },
  SOLD: { type: TransactionType.BUY, role: "sellerId" },
  BORROWED: { type: TransactionType.RENT, role: "buyerId" },
  LENT: { type: TransactionType.RENT, role: "sellerId" },
};
