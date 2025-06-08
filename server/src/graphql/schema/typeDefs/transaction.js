import gql from "graphql-tag";

export const transactionTypeDefs = gql`
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
    product: Product
    buyer: User
    seller: User
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
  }

  type Mutation {
    buyProduct(data: BuyInput!): Transaction!
    rentProduct(data: RentInput!): Transaction!
  }

  type Query {
    getMyTransactions(type: String!): [Transaction!]!
  }
`;
