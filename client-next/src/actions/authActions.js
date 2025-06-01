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

export const SIGNUP_MUTATION = gql`
  mutation signup(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $address: String!
    $phoneNumber: String!
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      address: $address
      phoneNumber: $phoneNumber
    ) {
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
      const errorMessage = errors.map((err) => err.message).join(", ");
      throw new Error(errorMessage || "GraphQL login error");
    }

    if (!data || !data.login || !data.login.token) {
      throw new Error("Login failed: Invalid response from server.");
    }

    return data.login.token;
  } catch (error) {
    console.error("Error during GraphQL login:", error);
    throw error;
  }
}

export async function signup(data) {
  try {
    const { data: result, errors } = await client.mutate({
      mutation: SIGNUP_MUTATION,
      variables: {
        ...data,
      },
    });

    if (errors) {
      const errorMessage = errors.map((err) => err.message).join(", ");
      throw new Error(errorMessage || "GraphQL signup error");
    }

    if (!result || !result.signup || !result.signup.token) {
      throw new Error("Signup failed: Invalid response from server.");
    }

    return result.signup.token;
  } catch (error) {
    console.error("Error during GraphQL signup:", error);
    throw error;
  }
}
