export const transactionResolvers = {
  Mutation: {
    buyProduct: async (
      _,
      { data },
      { user, transactionService, productService }
    ) => {
      if (!user) throw new Error("Unauthorized");
      return transactionService.buyProduct(data, user.id, productService);
    },
    rentProduct: async (
      _,
      { data },
      { user, transactionService, productService }
    ) => {
      if (!user) throw new Error("Unauthorized");
      return transactionService.rentProduct(data, user.id, productService);
    },
  },

  Query: {
    getMyTransactions: async (_, { type }, { user, transactionService }) => {
      if (!user) throw new Error("Unauthorized");
      return transactionService.getUserTransactions(user.id, type);
    },
  },
};
