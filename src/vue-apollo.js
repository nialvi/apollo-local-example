import Vue from "vue";
import VueApollo from "vue-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import typeDefs from "./graphql/typedefs.gql";
import DataLoader from "dataloader";

const userLoader = new DataLoader((ids) =>
  Promise.all(
    ids.map((id) =>
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((r) =>
        r.json()
      )
    )
  )
);

const resolvers = {
  Query: {
    async todo(_, vars) {
      const rawTodoData = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${vars.id}`
      ).then((res) => res.json());
      return {
        ...rawTodoData,
        __typename: "ClientTodo",
      };
    },
    async todos() {
      const rawTodosData = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      ).then((res) => res.json());

      return rawTodosData.map((todo) => ({
        __typename: "ClientTodo",
        ...todo,
      }));
    },
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

  ClientTodo: {
    async user(parent) {
      const rawUserData = await userLoader.load(parent.userId);

      return {
        ...rawUserData,
        __typename: "ClientUser",
      };
    },
  },

  ClientUser: {
    address(parent) {
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
