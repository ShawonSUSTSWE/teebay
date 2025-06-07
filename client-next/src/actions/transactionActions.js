import { gql } from "@apollo/client";

export const BUY_PRODUCT = gql`
  mutation buyProduct($data: BuyInput!) {
    buyProduct(data: $data) {
      id
      product {
        id
        name
      }
      buyer {
        id
        firstName
        lastName
        email
      }
      seller {
        id
        firstName
        lastName
        email
      }
      type
      amount
      createdAt
    }
  }
`;

export const TRANSACTION_LIST = gql`
  query getMyTransactions($type: String!) {
    getMyTransactions(type: $type) {
      id
      product {
        id
        name
        description
        categories
        createdAt
      }
      type
      amount
      rentDuration
      startDate
      endDate
      createdAt
    }
  }
`;
