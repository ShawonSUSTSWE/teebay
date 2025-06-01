"use client";

import createApolloClient from "@/config/apollo-client";
import { ApolloProvider } from "@apollo/client";

const client = createApolloClient();

function ApolloProviderWrapper({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloProviderWrapper;
