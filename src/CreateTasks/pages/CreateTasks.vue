<template>
  <q-page class="row justify-center">
    <q-card class="q-ma-md" style="max-width: 500px; width: 100%">
      <q-card-section class="q-pa-md">
        <q-card-title class="text-h6 text-center block q-mb-md"
          >Crea una nueva tarea</q-card-title
        >
        <FormTasks @submit="createTask" :loading="loading" />
      </q-card-section>
      <q-card-actions class="q-mb-md justify-between"> </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useTodoStore } from "../../stores/tasks/todo";
import FormTasks from "../components/FormTasks.vue";

const store = useTodoStore();
const $q = useQuasar();

const loading = ref(false);

const createTask = (val: string) => {
  loading.value = true;
  setTimeout(() => {
    store.addTodo(val);
    $q.notify({
      message: "Tarea creada con éxito",
      color: "positive",
      position: "top",
    });
    $q.localStorage.set("todos", store.getTodos);
    loading.value = false;
  }, 1000);
};
</script>
