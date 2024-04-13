<template>
  <q-page class="row justify-center">
    <q-card class="q-ma-md" style="max-width: 500px; width: 100%">
      <q-card-section class="q-pa-md">
        <p class="text-h6 q-ma-none text-center block">
          ¡Bienvenido a tu TodoApp!
        </p>
      </q-card-section>
      <q-card-actions class="q-mb-md no-wrap justify-between">
        <q-input
          style="width: 75%"
          dense
          :disable="!store.getTodosCopy.length"
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
      <div v-show="store.getTodosCopy.length" class="q-pa-lg">
        <q-option-group
          dense
          @update:model-value="(val) => filteredTodos(val)"
          class="flex no-wrap justify-between"
          v-model="group"
          :options="options"
          color="primary"
        />
      </div>
      <div v-if="store.getTodos.length > 0">
        <Todo v-for="todo in store.getTodos" :key="todo.id" :todo="todo" />
      </div>
      <q-card-section v-show="!store.getTodos.length" class="text-center">
        <p class="text-h6 q-ma-none">No tienes tareas!!</p>
      </q-card-section>
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
  store.filteredsTodos(val);
};
</script>
