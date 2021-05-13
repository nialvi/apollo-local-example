<template>
  <div>
    <div>
      <input type="number" v-model="id" />
      <div v-if="$apollo.queries.todo.loading">Loading 1 todo...</div>
      <div v-else>{{ todo }}</div>
    </div>

    <hr />

    <div>
      <div v-if="$apollo.queries.todos.loading">Loading...</div>
      <div v-else>{{ todos }}</div>
    </div>
  </div>
</template>

<script>
import todoListQuery from "../graphql/todoList.query.gql";
import todoQuery from "../graphql/todo.query.gql";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  apollo: {
    todos: {
      query: todoListQuery,
    },
    todo: {
      query: todoQuery,
      variables() {
        return { id: this.id };
      },
    },
  },
  data() {
    return { id: 1 };
  },
};
</script>
