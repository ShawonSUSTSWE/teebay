import createApolloClient from "@/config/apollo-client";
import { gql } from "@apollo/client";

const client = createApolloClient();

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export async function login(email, password) {
  try {
    const { data, errors } = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { email, password },
    });

    if (errors) {
      console.log("1");
      const errorMessage = errors.map((err) => err.message).join(", ");
      throw new Error(errorMessage || "GraphQL login error");
    }

    if (!data || !data.login || !data.login.token) {
      console.log("2");
      throw new Error("Login failed: Invalid response from server.");
    }

    return data.login.token;
  } catch (error) {
    console.error("Error during GraphQL login:", error);
    throw error;
  }
}
