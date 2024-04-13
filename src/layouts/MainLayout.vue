<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <q-avatar>
            <q-icon size="30px" name="list" />
          </q-avatar>
          Todo App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useQuasar } from "quasar";
import { useTodoStore } from "src/stores/tasks/todo";
defineOptions({
  name: "MainLayout",
});

const $q = useQuasar();
const store = useTodoStore();

onMounted(() => {
  const data = $q.localStorage.getItem("todos");
  if (!data) {
    $q.localStorage.set("todos", []);
  }

  if (Array.isArray(data) && data.length) {
    store.setTodos(data);
  }
});
</script>
