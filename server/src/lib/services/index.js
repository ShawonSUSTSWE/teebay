import CategoryService from "./categoryService.js";
import ProductService from "./productService.js";
import UserService from "./userService.js";

export const createServices = (prisma) => {
  return {
    userService: new UserService(prisma),
    productService: new ProductService(prisma),
    categoryService: new CategoryService(prisma),
  };
};
