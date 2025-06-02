import { gql } from "@apollo/client";

export const GET_OWNED_PRODUCTS_QUERY = gql`
  query GetProductsByOwner {
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

export async function fetchOwnedProducts(client) {
  try {
    const { data } = await client.query({
      query: GET_OWNED_PRODUCTS_QUERY,
      fetchPolicy: "cache-first",
    });
    return data.getProductsByOwner;
  } catch (error) {
    console.error("Error fetching owned products:", error);
    throw new Error("Failed to fetch owned products");
  }
}
