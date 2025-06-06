import ProductService from "./productService.js";
import TransactionService from "./transactionService.js";
import UserService from "./userService.js";

export const createServices = (prisma) => {
  return {
    userService: new UserService(prisma),
    productService: new ProductService(prisma),
    transactionService: new TransactionService(prisma),
  };
};
