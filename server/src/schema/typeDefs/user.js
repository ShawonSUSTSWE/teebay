import gql from "graphql-tag";

export const userTypeDefs = gql`
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    address: String!
    phoneNumber: String!
  }

  extend type Query {
    getUsers: [User]
    getUserById(id: ID!): User
  }

  extend type Mutation {
    addUser(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      address: String!
      phoneNumber: String!
    ): User
  }
`;
