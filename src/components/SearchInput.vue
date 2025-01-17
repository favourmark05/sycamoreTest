<template>
  <div class="flex items-center bg-gray-200 px-4 py-2 max-w-md w-full">
    <svg
      class="w-5 h-5 text-gray-400 mr-2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
      />
    </svg>
    <input
      :value="modelValue"
      @input="handleInput"
      type="text"
      placeholder="Search customer..."
      class="bg-transparent focus:outline-none text-gray-700 w-full"
    />
  </div>
</template>
  
<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:modelValue', 'search']);

const handleInput = (event) => {
  emit('update:modelValue', event.target.value);
  emit('search');
};
</script>
  