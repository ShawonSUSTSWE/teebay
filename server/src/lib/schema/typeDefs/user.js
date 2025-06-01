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

  type AuthResponse {
    token: String!
  }

  extend type Query {
    getUsers: [User]
    getUserById(id: ID!): User
  }

  extend type Mutation {
    signup(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      address: String!
      phoneNumber: String!
    ): AuthResponse
    login(email: String!, password: String!): AuthResponse
  }
`;
