import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { userTypeDefs } from "./typeDefs/user.js";
import { userResolvers } from "./resolvers/user.js";

const baseTypeDefs = `#graphql
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const typeDefs = mergeTypeDefs([baseTypeDefs, userTypeDefs]);

const resolvers = mergeResolvers([userResolvers]);

export const schema = {
  typeDefs,
  resolvers,
};
