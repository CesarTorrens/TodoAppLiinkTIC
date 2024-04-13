import { defineStore } from "pinia";
import { ToDo } from "./models";
import { v4 as uuidv4 } from "uuid";

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    todos: [] as ToDo[],
    todosCopy: [] as ToDo[],
  }),
  getters: {
    getTodos: (state) => state.todos,
    getTodosCopy: (state) => state.todosCopy,
  },
  actions: {
    addTodo(title: ToDo["title"]) {
      const todoId = uuidv4();
      this.todos.push({ id: todoId, title, completed: false });
      this.todosCopy = this.todos;
    },
    deleteTodo(id: string) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.todosCopy = this.todos;
    },

    toggleCompleted(id: string) {
      const findIndex = this.todos.findIndex((todo) => todo.id === id);
      if (findIndex > -1) {
        this.todos[findIndex] = {
          ...this.todos[findIndex],
          completed: !this.todos[findIndex].completed,
        };
      }
    },

    updateTodo(id: string, title: string) {
      const findIndex = this.todos.findIndex((todo) => todo.id === id);
      if (findIndex > -1) {
        this.todos[findIndex] = {
          ...this.todos[findIndex],
          title,
          completed: false,
        };
      }
      this.todosCopy = this.todos;
    },

    setTodos(todos: ToDo[]) {
      this.todos = todos;
      this.todosCopy = this.todos;
    },

    searchTodos(search: string) {
      if (!search) return (this.todos = this.todosCopy);
      this.todos = this.todosCopy.filter((todo) =>
        todo.title.toLowerCase().includes(search.toLowerCase())
      );
    },

    filteredsTodos(filter: "all" | "completed" | "active") {
      if (filter === "all") {
        this.todos = this.todosCopy;
        return;
      }
      this.todos = this.todosCopy.filter((todo) =>
        filter === "completed" ? todo.completed : !todo.completed
      );
    },
  },
});
