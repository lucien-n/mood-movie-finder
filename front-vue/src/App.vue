<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { TodoFilter, type Todo } from "@/types";
import TodoItem from "@/components/TodoItem.vue";
import NewTodo from "@/components/NewTodo.vue";
import TodoToolbar from "@/components/TodoToolbar.vue";

const todos = ref<Todo[]>([]);
const filter = ref<TodoFilter>(TodoFilter.All);

onMounted(() => {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todos.value = JSON.parse(savedTodos);
  }
});

const filteredTodos = computed(() => {
  switch (filter.value) {
    case TodoFilter.Active:
      return todos.value.filter((todo) => !todo.completed);
    case TodoFilter.Completed:
      return todos.value.filter((todo) => todo.completed);
    default:
      return todos.value;
  }
});

const handleNew = (todo: Todo) => {
  todos.value.push(todo);
  saveTodos();
};

const handleToggleComplete = (id: number) => {
  const todo = todos.value.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
  }
};

const handleDelete = (id: number) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
  saveTodos();
};

const handleClearCompleted = () => {
  todos.value = todos.value.filter((todo) => !todo.completed);
  saveTodos();
};

const handleFilter = (newFilter: TodoFilter) => {
  filter.value = newFilter;
};

const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos.value));
};
</script>

<template>
  <div class="max-w-md mx-auto mt-8 p-4">
    <h1 class="text-2xl font-bold mb-4">Todo List</h1>

    <NewTodo :onSubmit="handleNew" />

    <div class="bg-white rounded shadow">
      <ul class="divide-y">
        <li
          v-for="todo in filteredTodos"
          :key="todo.id"
          class="p-2 flex items-center gap-2 hover:bg-gray-50"
        >
          <TodoItem
            :todo="todo"
            :onDelete="() => handleDelete(todo.id)"
            :onToggle="() => handleToggleComplete(todo.id)"
          />
        </li>
      </ul>

      <div class="p-2 flex justify-between items-center text-sm">
        <TodoToolbar
          :todos="todos"
          :filter="filter"
          :onFilter="handleFilter"
          :onClearCompleted="handleClearCompleted"
        />
      </div>
    </div>
  </div>
</template>
