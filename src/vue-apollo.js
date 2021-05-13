import Vue from "vue";
import VueApollo from "vue-apollo";
import typeDefs from "./graphql/typedefs.gql";

import { ApolloClient, InMemoryCache } from "@apollo/client";

const resolvers = {
  Query: {
    async users() {
      const rawUserData = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      ).then((res) => res.json());

      return rawUserData.map((user) => ({
        __typename: "ClientUser",
        ...user,
      }));
    },
  },
  ClientUser: {
    address(parent) {
      console.log("resolver address called");
      return {
        __typename: "ClientAddress",
        ...parent.address,
        id: `address-${parent.id}`,
      };
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
