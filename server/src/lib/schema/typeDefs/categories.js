import gql from "graphql-tag";

export const categoryTypeDefs = gql`
  type Category {
    id: ID!
    name: String!
  }

  extend type Query {
    getAllCategories: [Category!]!
  }
`;
