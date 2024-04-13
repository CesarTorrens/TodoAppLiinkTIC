<template>
  <q-page class="row justify-center">
    <q-card class="q-ma-md" style="max-width: 500px; width: 100%">
      <q-card-section class="q-pa-md">
        <q-card-title class="text-h6 text-center block"
          >Welcome to the Todo App</q-card-title
        >
      </q-card-section>
      <q-card-actions class="q-mb-md no-wrap justify-between">
        <q-input
          style="width: 75%"
          dense
          v-model="search"
          outlined
          @update:model-value="searchTodos"
          placeholder="Buscar tarea"
        />
        <q-btn
          style="width: 20%"
          outline
          unelevated
          to="/create-tasks"
          color="primary"
          no-caps
          label="Crear tarea"
        />
      </q-card-actions>
      <div class="q-pa-lg">
        <q-option-group
          dense
          @update:model-value="(val) => filteredTodos(val)"
          class="flex no-wrap justify-between"
          v-model="group"
          :options="options"
          color="primary"
        />
      </div>
      <Todo v-for="todo in store.getTodos" :key="todo.id" :todo="todo" />
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Todo from "../components/Todo.vue";
import { useTodoStore } from "../stores/tasks/todo";

const store = useTodoStore();
const search = ref<string>("");
const group = ref<"completed" | "active" | "all">("all");

const options = [
  {
    label: "Completadas",
    value: "completed",
  },
  {
    label: "No completadas",
    value: "active",
  },
  {
    label: "Todas",
    value: "all",
  },
];

const searchTodos = () => {
  store.searchTodos(search.value);
};

const filteredTodos = (val: "completed" | "active" | "all") => {
  console.log("val", val);
  store.filteredsTodos(val);
};
</script>
