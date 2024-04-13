<template>
  <q-page class="row justify-center">
    <q-card class="q-ma-md" style="max-width: 500px; width: 100%">
      <q-card-section class="q-pa-md">
        <q-card-title class="text-h6 text-center block q-mb-md"
          >Actualiza tu tarea</q-card-title
        >
        <FormTasks
          v-if="todo"
          :todo="todo"
          :loading="loading"
          @submit="updateTask"
        />
      </q-card-section>
      <q-card-actions class="q-mb-md justify-between"> </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter, Router, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import { ToDo } from "../../stores/tasks/models";
import { useTodoStore } from "../../stores/tasks/todo";
import FormTasks from "../components/FormTasks.vue";

const store = useTodoStore();
const router: Router = useRouter();
const route = useRoute();
const $q = useQuasar();
const todo = ref<ToDo>();
const loading = ref(false);

const updateTask = (val: string) => {
  loading.value = true;
  if (!todo.value) {
    loading.value = false;
    return;
  }
  store.updateTodo(todo.value.id, val);
  $q.notify({
    message: "Tarea actualizada con éxito",
    color: "positive",
    position: "top",
  });
  $q.localStorage.set("todos", store.getTodos);
  loading.value = false;
};

onMounted(() => {
  const id = route.params.id;
  if (!id) {
    return router.push("/");
  }
  todo.value = store.getTodos.find((todo) => todo.id === id);
  if (!todo.value) {
    return router.push("/");
  }
});
</script>
