// stores/customerStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCustomerStore = defineStore('customer', 
  () => {
    // State
    const customers = ref([]);
    const filteredCustomers = ref([]);
    const searchQuery = ref('');
    const customerToEdit = ref();


    // Actions
    const searchCustomers = (query) => {
      searchQuery.value = query;
      if (!query.trim()) {
        filteredCustomers.value = [...customers.value];
        return;
      }
      const searchTerm = query.toLowerCase();
      filteredCustomers.value = customers.value.filter(customer => {
        return (
            customer.firstName?.toLowerCase().includes(searchTerm) ||
            customer.lastName?.toLowerCase().includes(searchTerm) ||
            customer.email?.toLowerCase().includes(searchTerm) ||
            customer.phone?.toLowerCase().includes(searchTerm) ||
            customer.state?.toLowerCase().includes(searchTerm)
          );
      });
    };

    const resetSearch = () => {
      searchQuery.value = '';
      filteredCustomers.value = [...customers.value];
    };

    const addCustomer = (customer) => {
        const newCustomer = {
            ...customer,
            id: Date.now().toString()
          };
      customers.value.unshift(newCustomer);
      // Also update filtered results if there's an active search
      if (searchQuery.value) {
        searchCustomers(searchQuery.value);
      } else {
        filteredCustomers.value = [...customers.value];
      }
    };

    const deleteCustomer = (customerId) => {
        // Remove from main customers array
        customers.value = customers.value.filter(customer => customer.id !== customerId);
        
        // Update filtered results to maintain consistency
        if (searchQuery.value) {
          searchCustomers(searchQuery.value);
        } else {
          filteredCustomers.value = [...customers.value];
        }
      };
      const setCustomerToEdit = (customer) => {
        customerToEdit.value = { ...customer };
      };

      const updateCustomer = (updatedCustomer) => {
        const index = customers.value.findIndex(c => c.id === updatedCustomer.id);
        if (index !== -1) {
          customers.value[index] = { ...updatedCustomer };
          if (searchQuery.value) {
            searchCustomers(searchQuery.value);
          } else {
            filteredCustomers.value = [...customers.value];
          }
          return true;
        }
        return false;
      };

    const getAllCustomers = computed(() => {
      return filteredCustomers.value.length > 0 ? filteredCustomers.value : customers.value;
    });

    const initializeCustomers = (data) => {
      customers.value = data;
      filteredCustomers.value = [...data];
    };

    return {
      customers,
      filteredCustomers,
      searchQuery,
      searchCustomers,
      resetSearch,
      addCustomer,
      deleteCustomer,
      getAllCustomers,
      initializeCustomers,
      updateCustomer,
      setCustomerToEdit,
      customerToEdit
    };
  },
  {
    persist: {
      key: 'customer-store',
      storage: localStorage,
      paths: ['customers'] // We only need to persist the main customers array
    }
  }
);