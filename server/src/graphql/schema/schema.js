import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { userTypeDefs } from "./typeDefs/user.js";
import { userResolvers } from "./resolvers/user.js";
import { productTypeDefs } from "./typeDefs/product.js";
import { productResolvers } from "./resolvers/product.js";
import { transactionTypeDefs } from "./typeDefs/transaction.js";
import { transactionResolvers } from "./resolvers/transaction.js";

const baseTypeDefs = `#graphql
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const typeDefs = mergeTypeDefs([
  baseTypeDefs,
  userTypeDefs,
  productTypeDefs,
  transactionTypeDefs,
]);

const resolvers = mergeResolvers([
  userResolvers,
  productResolvers,
  transactionResolvers,
]);

export const schema = {
  typeDefs,
  resolvers,
};
