import Vue from "vue";
import VueApollo from "vue-apollo";
import typeDefs from "./graphql/typedefs.gql";

import { ApolloClient, InMemoryCache } from "@apollo/client";

const resolvers = {
  Query: {
    users() {
      console.log("resolver called");
      return fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
        res.json()
      );
    },
  },
};

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  resolvers,
  typeDefs,
});

Vue.use(VueApollo);

export function createProvider() {
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
  });

  return apolloProvider;
}
