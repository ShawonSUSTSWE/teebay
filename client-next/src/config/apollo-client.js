import { logout } from "@/actions/authActions";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
  credentials: "include",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      console.log(err);
      if (
        (err.extensions && err.extensions.code === "UNAUTHENTICATED") ||
        err.message === "Unauthorized"
      ) {
        logout();
        window.location.href = "/login";
        return;
      }
    }
  }

  if (networkError) {
    console.error(networkError);
  }
});

const client = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
