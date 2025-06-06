import gql from "graphql-tag";

export const productTypeDefs = gql`
  scalar Date

  enum ProductStatus {
    AVAILABLE
    SOLD
    PENDING
    DRAFT
  }

  enum RentDuration {
    HOURLY
    DAILY
    WEEKLY
    MONTHLY
  }

  type Product {
    id: ID!
    name: String!
    description: String
    price: Int
    rentalPrice: Int
    rentDuration: RentDuration
    status: ProductStatus!
    owner: User
    categories: [String!]!
    createdAt: Date!
    updatedAt: Date!
  }

  type ProductResponse {
    id: ID!
    status: ProductStatus!
  }

  input ProductInput {
    name: String!
    description: String
    price: Int
    rentalPrice: Int
    rentDuration: RentDuration
  }

  type Query {
    getProductById(id: ID!): Product
    getAllAvailableProducts: [Product!]!
    getProductsByOwner: [Product!]!
  }

  type Mutation {
    createProduct(data: ProductInput!, categoryNames: [String!]!): Product!
    updateProduct(
      id: ID!
      data: ProductInput!
      categoryNames: [String!]!
    ): Product!
    deleteProduct(id: ID!): ProductResponse!
    updateProductStatus(id: ID!, status: ProductStatus!): ProductResponse!
  }
`;
