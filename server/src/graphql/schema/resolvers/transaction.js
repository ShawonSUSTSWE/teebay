export const transactionResolvers = {
  Mutation: {
    buyProduct: async (
      _,
      { data },
      { user, transactionService, productService }
    ) => {
      if (!user) throw new Error("Unauthorized");
      console.log(data);
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
    getMyTransactions: async (_, __, { user, transactionService }) => {
      if (!user) throw new Error("Unauthorized");
      return transactionService.getUserTransactions(user.id);
    },
  },
};
