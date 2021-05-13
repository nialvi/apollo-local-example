<template>
  <div>
    <div v-if="$apollo.queries.users.loading">Loading...</div>
    <div v-else>{{ users }}</div>
  </div>
</template>

<script>
import usersListQuery from "../graphql/usersList.query.gql";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  apollo: {
    users: {
      query: usersListQuery,
    },
  },
};
</script>
