<script setup lang="ts">
import { type Todo } from "@/types";

interface Props {
  todo: Todo;
  onToggle: VoidFunction;
  onDelete: VoidFunction;
}

const { todo, onToggle, onDelete } = defineProps<Props>();
</script>

<template>
  <input
    type="checkbox"
    :checked="todo.completed"
    @change="onToggle"
    class="h-4 w-4"
  />
  <span class="flex-1" :class="{ 'line-through opacity-50': todo.completed }">
    {{ todo.text }}
  </span>
  <button @click="onDelete" class="text-red-500 hover:text-red-700">
    Delete
  </button>
</template>
