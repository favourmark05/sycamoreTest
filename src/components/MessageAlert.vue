<template>
  <div
    v-for="toast in toasts"
    :key="toast"
    class="absolute top-4 right-4 bg-green-100 text-green-800 px-4 py-3 rounded shadow flex items-center space-x-2 transition-opacity duration-300"
    :class="{
      'bg-green-100 text-green-800': toast.type === 'success',
      'bg-red-100 text-red-800': toast.type === 'error',
      'bg-blue-100 text-blue-800': toast.type === 'info',
      'bg-yellow-100 text-yellow-800': toast.type === 'warning',
    }"
  >
    <svg
      v-if="toast.type === 'success'"
      class="h-5 w-5 text-green-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 13l4 4L19 7"
      />
    </svg>
    <svg
      v-if="toast.type === 'error'"
      class="h-5 w-5 text-red-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
    <svg
      v-if="toast.type === 'info'"
      class="h-5 w-5 text-blue-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20 10 10 0 010-20z"
      />
    </svg>
    <svg
    v-if="toast.type === 'warning'"
      class="h-5 w-5 text-yellow-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4m0 4h.01"
      />
    </svg>

    <span>{{ toast.message }}</span>
    <button
      class="ml-auto text-green-700 hover:text-green-900 focus:outline-none"
      :class="{
        'text-green-700': toast.type === 'success',
        'text-red-700': toast.type === 'error',
        'text-blue-700': toast.type === 'info',
        'text-yellow-700': toast.type === 'warning',
      }"
      @click="closeAlert(toast)"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useToastStore } from "@/stores/toast.js";
const useToast = useToastStore();

const toasts = computed(() => useToast.toasts);
const closeAlert = (toast) => useToast.removeToast(toast);
</script>
<style>
</style>