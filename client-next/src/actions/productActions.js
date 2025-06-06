import { gql } from "@apollo/client";

export const GET_OWNED_PRODUCTS_QUERY = gql`
  query getProductsByOwner {
    getProductsByOwner {
      id
      name
      description
      status
      price
      rentalPrice
      rentDuration
      categories {
        id
        name
      }
      createdAt
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation createProduct($data: ProductInput!, $categoryNames: [String!]!) {
    createProduct(data: $data, categoryNames: $categoryNames) {
      id
      name
      description
      status
      price
      rentalPrice
      rentDuration
      categories {
        id
        name
      }
      createdAt
    }
  }
`;

export const GET_PRODUCT_DETAILS = gql`
  query getProductById($id: ID!) {
    getProductById(id: $id) {
      id
      name
      description
      status
      price
      rentalPrice
      rentDuration
      categories {
        id
        name
      }
      owner {
        id
        email
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $id: ID!
    $data: ProductInput!
    $categoryNames: [String!]!
  ) {
    updateProduct(id: $id, data: $data, categoryNames: $categoryNames) {
      id
      name
      description
      status
      price
      rentalPrice
      rentDuration
      categories {
        id
        name
      }
    }
  }
`;

export const GET_AVAILABLE_PRODUCTS = gql`
  query getAvailableProducts {
    getAllAvailableProducts {
      id
      name
      description
      status
      price
      rentalPrice
      rentDuration
      categories {
        id
        name
      }
      createdAt
    }
  }
`;
