import Vue from "vue";
import VueApollo from "vue-apollo";

import { ApolloClient, InMemoryCache } from "@apollo/client";

const resolvers = {};

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  resolvers,
});

Vue.use(VueApollo);

export function createProvider() {
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
  });

  return apolloProvider;
}
