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
    success: Boolean!
    message: String
  }

  type SessionResponse {
    id: String
    email: String
  }

  extend type Query {
    getUsers: [User]
    getUserById(id: ID!): User
    session: SessionResponse!
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
    login(email: String!, password: String!): AuthResponse!
    logout: AuthResponse!
  }
`;
