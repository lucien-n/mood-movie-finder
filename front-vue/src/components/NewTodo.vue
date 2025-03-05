<script setup lang="ts">
import { ref } from "vue";
import type { Todo } from "@/types";

interface Props {
  onSubmit: (todo: Todo) => void;
}
const { onSubmit } = defineProps<Props>();

const newTodo = ref("");

const handleSubmit = () => {
  const formattedContent = newTodo.value.trim();
  if (!formattedContent) return;

  onSubmit({
    id: Date.now(),
    text: formattedContent,
    completed: false,
  });
  newTodo.value = "";
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="mb-4">
    <div class="flex gap-2">
      <input
        v-model="newTodo"
        type="text"
        placeholder="Add a new todo"
        class="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Add
      </button>
    </div>
  </form>
</template>
