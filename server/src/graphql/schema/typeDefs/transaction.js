import gql from "graphql-tag";

export const transactionTypeDefs = gql`
  scalar Date

  enum TransactionType {
    BUY
    RENT
  }

  enum RentDuration {
    HOURLY
    DAILY
    WEEKLY
    MONTHLY
  }

  type Transaction {
    id: ID!
    productId: ID!
    buyerId: ID!
    sellerId: ID!
    type: TransactionType!
    startDate: Date
    endDate: Date
    amount: Int!
    rentDuration: RentDuration
    createdAt: Date!
  }

  input BuyInput {
    productId: ID!
  }

  input RentInput {
    productId: ID!
    startDate: Date!
    endDate: Date!
    rentDuration: RentDuration!
  }

  type Mutation {
    buyProduct(data: BuyInput!): Transaction!
    rentProduct(data: RentInput!): Transaction!
  }

  type Query {
    getMyTransactions: [Transaction!]!
  }
`;
