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
