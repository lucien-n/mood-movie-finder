<script setup lang="ts">
import { computed } from "vue";
import { TodoFilter, type Todo } from "@/types";

interface Props {
  todos: Todo[];
  filter: TodoFilter;
  onFilter: (filter: TodoFilter) => void;
  onClearCompleted: VoidFunction;
}
const { todos, onFilter, onClearCompleted } = defineProps<Props>();

const remaining = computed(
  () => todos.filter((todo) => !todo.completed).length
);
</script>

<template>
  <span>{{ remaining }} items left</span>
  <div class="flex gap-2">
    <button
      v-for="f in Object.values(TodoFilter)"
      :key="f"
      @click="() => onFilter(f)"
      class="px-2 py-1 rounded"
      :class="{ 'bg-blue-100': filter === f }"
    >
      {{ f.charAt(0).toUpperCase() + f.slice(1) }}
    </button>
  </div>
  <button @click="onClearCompleted" class="text-red-500 hover:text-red-700">
    Clear Completed
  </button>
</template>
