<template>
  <div 
  v-if="isVisible" 
  class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
>
  <div 
    class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-4"
    role="dialog"
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
  >
    <!-- Modal Header -->
    <div class="flex items-center space-x-3">
      <svg
        class="h-6 w-6 text-yellow-500"
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
      <h3 id="modal-title" class="text-lg font-semibold text-gray-800">
        {{ title }}
      </h3>
    </div>
    
    <!-- Modal Body -->
    <p id="modal-description" class="text-gray-600">
      {{ message }}
    </p>
    
    <!-- Modal Footer -->
    <div class="flex justify-end space-x-3">
      <button 
        @click="onCancel" 
        class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
      >
        No
      </button>
      <button 
        @click="onConfirm" 
        class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
      >
        Yes
      </button>
    </div>
  </div>
</div>

</template>
<script setup>
const emit = defineEmits(["confirm", "update:isVisible"]);
const props = defineProps({
    message: String,
    title: String,
    isVisible: Boolean,
})
const onConfirm = () => {
  emit("confirm");
  emit("update:isVisible", false);
};
const onCancel = () => {
  emit("update:isVisible", false);
};
</script>
<style>
</style>