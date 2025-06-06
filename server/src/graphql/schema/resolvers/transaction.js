import { dateScalar } from "../../scalars/DateScalar.js";

export const transactionResolvers = {
  Date: dateScalar,
  Mutation: {
    buyProduct: async (_, { data }, { user, transactionService }) => {
      if (!user) throw new Error("Unauthorized");
      return transactionService.buyProduct(data, user.id);
    },
    rentProduct: async (_, { data }, { user, transactionService }) => {
      if (!user) throw new Error("Unauthorized");
      return transactionService.rentProduct(data, user.id);
    },
  },

  Query: {
    getMyTransactions: async (_, __, { user, transactionService }) => {
      if (!user) throw new Error("Unauthorized");
      return transactionService.getUserTransactions(user.id);
    },
  },
};
