export const productResolvers = {
  Query: {
    getProductById: async (_, { id }, { productService }) => {
      return await productService.getProductById(id);
    },
    getAllAvailableProducts: async (_, __, { productService }) => {
      return await productService.getAllAvailableProducts();
    },
    getProductsByOwner: async (_, __, { user, productService }) => {
      if (!user) throw new Error("Unauthorized");
      return await productService.getProductsByOwner(user.id);
    },
  },

  Mutation: {
    createProduct: async (
      _,
      { data, categoryNames },
      { user, productService }
    ) => {
      if (!user) throw new Error("Unauthorized");
      return await productService.createProduct(data, categoryNames, user.id);
    },
    updateProduct: async (
      _,
      { id, data, categoryNames },
      { productService }
    ) => {
      return await productService.updateProduct(id, data, categoryNames);
    },
    deleteProduct: async (_, { id }, { productService, user }) => {
      if (!user) throw new Error("Unauthorized");
      return await productService.deleteProduct(id, user);
    },
    updateProductStatus: async (_, { id, status }, { productService }) => {
      return await productService.updateProductStatus(id, status);
    },
  },
};
