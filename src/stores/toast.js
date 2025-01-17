// stores/customerStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useToastStore = defineStore('toast', 
  () => {
    // State
    const toasts = ref([]);


    // Actions
    const showToast = (params) => {
    const toast = createToast(params)
    toasts.value.push(toast)
      setTimeout(() => {
        toasts.value = toasts.value.filter(x => x.id !== toast.id)
      },toast.life??3000);
    };

    const createToast = (params) => {
        const toast = {
            id: Date.now().toString(),
            ...params
          };
          return toast
    }

    const removeToast = (toast) => {
        toasts.value = toasts.value.filter(x => x.id !== toast.id)
    };

    return {
      toasts,
      showToast,
      removeToast
    };
  }
);