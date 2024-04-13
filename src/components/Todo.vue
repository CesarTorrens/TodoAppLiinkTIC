<template>
  <div class="q-pa-md row no-wrap items-center">
    <q-checkbox
      class="col-10"
      @update:model-value="completeTask"
      v-model="todoForm.completed"
      color="secondary"
    >
      <template #default>
        <span
          :style="`text-decoration: ${
            todoForm.completed ? 'line-through' : 'none'
          }; color: ${todoForm.completed ? 'green' : 'black'}`"
          >{{ todoForm.title }}</span
        >
      </template>
    </q-checkbox>
    <q-btn
      class="col-1"
      :to="`/update-tasks/${todo.id}`"
      unelevated
      rounded
      flat
      icon="edit"
      color="primary"
    />
    <q-btn
      class="col-1"
      @click="confirm = true"
      unelevated
      rounded
      flat
      icon="delete"
      color="negative"
    />
  </div>
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="warning" color="negative" text-color="white" />
        <span class="q-ml-sm"
          >¿Estás seguro que deseas eliminar este ToDo?</span
        >
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat no-caps label="No" color="primary" v-close-popup />
        <q-btn
          @click="deleteTodo"
          flat
          label="Si"
          color="primary"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ToDo } from "src/stores/tasks/models";
import { useTodoStore } from "src/stores/tasks/todo";
import { useQuasar } from "quasar";

const props = defineProps<{
  todo: ToDo;
}>();

const store = useTodoStore();
const $q = useQuasar();
const confirm = ref(false);
const todoForm = ref<ToDo>(props.todo);

const completeTask = () => {
  store.toggleCompleted(props.todo.id);
  $q.localStorage.set("todos", store.getTodos);
};

const deleteTodo = () => {
  store.deleteTodo(props.todo.id);
  $q.notify({
    color: "positive",
    position: "top",
    message: "ToDo eliminado",
  });
  $q.localStorage.set("todos", store.getTodos);
};
</script>
