<template>
  <q-form greedy @submit="submit" class="flex column" style="gap: 15px">
    <q-input
      v-model="taskName"
      outlined
      lazy-rules
      placeholder="Introduce la tarea a realizar"
      :rules="[(val) => (val && val.length) || 'La ToDo es requerida']"
    />
    <div class="flex justify-between">
      <q-btn no-caps to="/" outline label="Regresar" />
      <q-btn
        no-caps
        type="submit"
        :loading="loading"
        color="positive"
        :label="todo ? 'Actualizar tarea' : 'Crear tarea'"
      />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useQuasar } from "quasar";
import { useTodoStore } from "../../stores/tasks/todo";
import { ToDo } from "../../stores/tasks/models";

const $q = useQuasar();
const store = useTodoStore();

const props = defineProps<{
  todo?: ToDo;
  loading: boolean;
}>();

const saveTitle = ref<string>(props.todo?.title || "");

const emits = defineEmits<{
  (event: "submit", value: string): void;
  (event: "reset"): void;
}>();

const taskName = ref(props.todo?.title || "");

const submit = (e: Event) => {
  e.preventDefault();
  if (!taskName.value) {
    return;
  }
  const existTodo = store.getTodos.find(
    (todo) => todo.title === taskName.value
  );
  const todoUpdated = saveTitle.value === existTodo?.title;
  if (existTodo && !todoUpdated) {
    $q.notify({
      message: "La tarea ya existe",
      color: "negative",
      position: "top",
    });
    return;
  }

  saveTitle.value = taskName.value;

  emits("submit", taskName.value);
};

watch(
  () => props.loading,
  () => {
    if (!props.loading) {
      taskName.value = "";
    }
  }
);
</script>
