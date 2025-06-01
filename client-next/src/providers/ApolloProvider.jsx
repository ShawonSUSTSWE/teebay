"use client";

import client from "@/config/apollo-client";
import { ApolloProvider } from "@apollo/client";

function ApolloProviderWrapper({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloProviderWrapper;
