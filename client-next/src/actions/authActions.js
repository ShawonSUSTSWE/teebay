import client from "@/config/apollo-client";
import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      message
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
      success
      message
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation logout {
    logout {
      success
      message
    }
  }
`;

export const SESSION_QUERY = gql`
  query session {
    session {
      id
      email
    }
  }
`;

export async function login({ email, password }) {
  try {
    const { data, errors } = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { email, password },
    });

    if (errors) {
      const errorMessage = errors.map((err) => err.message).join(", ");
      throw new Error(errorMessage || "GraphQL login error");
    }

    if (!data || !data.login || !data.login.success) {
      throw new Error("Login failed: Invalid response from server.");
    }

    return data.login.success;
  } catch (error) {
    console.error("Error during GraphQL login:", error);
    throw error;
  }
}

export async function signup(userData) {
  try {
    const { data, errors } = await client.mutate({
      mutation: SIGNUP_MUTATION,
      variables: {
        ...userData,
      },
    });

    if (errors) {
      const errorMessage = errors.map((err) => err.message).join(", ");
      throw new Error(errorMessage || "GraphQL signup error");
    }

    if (!data || !data.signup || !data.signup.success) {
      throw new Error("Signup failed: Invalid response from server.");
    }

    return data.signup.success;
  } catch (error) {
    console.error("Error during GraphQL signup:", error);
    throw error;
  }
}

export async function logout() {
  try {
    const { data, errors } = await client.mutate({
      mutation: LOGOUT_MUTATION,
    });

    if (errors) {
      const errorMessage = errors.map((err) => err.message).join(", ");
      throw new Error(errorMessage || "GraphQL logout error");
    }

    if (!data || !data.logout || !data.logout.success) {
      throw new Error("Logout failed: Invalid response from server.");
    }

    await client.clearStore();

    return data.logout.success;
  } catch (error) {
    console.error("Error during GraphQL logout:", error);
    throw error;
  }
}
