<template>
  <div
    class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border bg-white p-5 rounded-lg"
  >

    <!-- Customer Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="header in tableHeaders"
              :key="header"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ header }}
            </th>
            <th class="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200" v-if="store.getAllCustomers.length > 0">
          <tr v-for="(customer, index) in store.getAllCustomers" :key="customer.id" class="border-b">
            <td class="px-6 py-4 whitespace-nowrap">{{ index + 1 }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ customer.firstName }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ customer.lastName  }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ customer.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ customer.phone }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ customer.state }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="[
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                  customer.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800',
                ]"
              >
                {{ customer.isActive ? "Active" : "Inactive" }}
              </span>
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
            >
              <button
                @click="toggleDropdown(index)"
                type="button"
                class="w-1 h-2"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                  <path
                    d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"
                  />
                </svg>
              </button>

              <!-- Dropdown menu, conditionally rendered -->
              <div v-if="dropdownStates[index]" class="absolute block mt-5 space-y-3">
                <button
                  @click="editCustomer(customer)"
                  class="items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Edit
                </button>
                <br />
                <button
                  @click="confirmDelete(customer.id)"
                  class="items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else class="text-center w-full ">
            <tr>
                <td colspan="7" class="px-6 py-4 text-center text-gray-500">No customers found</td>
            </tr>
        </tbody>
      </table>
    </div>
    <ConfirmModal
      :isVisible="isVisible"
      :title="'Delete Customer'"
      :message="'Are you sure you want to delete this customer?'"
      @confirm="handleDelete"
      @update:isVisible="handleUpdate"
    ></ConfirmModal>

    <!-- Footer -->
    <footer class="mt-8 text-center text-sm text-gray-500">
      <p>
        Design inspired by
        <a
          href="https://www.behance.net/gallery/211291667/user-management-(-UI-design-)?tracking_source=search_projects|customer+dashboard&l=10"
          class="text-indigo-600 hover:text-indigo-900"
          >Behance - Customer Dashboard by Shahzaib Ahmad</a
        >
      </p>
    </footer>
  </div>
</template>
  
<script setup>
import { ref, computed, watch } from "vue";
import { useCustomerStore } from "../stores/customerStore";
import { useToastStore } from "../stores/toast";
import { useRouter } from 'vue-router'
import ConfirmModal from "./ConfirmModal.vue";
  
const router = useRouter();
const dropdownStates = ref({})
const store = useCustomerStore();
const toastStore = useToastStore();
const searchQuery = ref("");
const isOpen = ref(false);
const isVisible = ref(false)

const toggleDropdown = (index) => {
    dropdownStates.value[index] = !dropdownStates.value[index];

};

const tableHeaders = ["#", "First Name", "Last Name", "Email", "Phone", "State", "Status"];

// Filter customers by search query across multiple fields
const filteredCustomers = computed(() => {
  if (!searchQuery.value) return store.customers;

  const lowerCaseQuery = searchQuery.value.toLowerCase();

  return store.customers.filter(
    (customer) =>
      customer.email.toLowerCase().includes(lowerCaseQuery) ||
      `${customer.firstName} ${customer.lastName}`
        .toLowerCase()
        .includes(lowerCaseQuery) ||
      customer.phone.toLowerCase().includes(lowerCaseQuery) ||
      customer.state.toLowerCase().includes(lowerCaseQuery) ||
      (customer.isActive ? "active" : "inactive").includes(lowerCaseQuery)
  );
});

watch(filteredCustomers, (newCustomers) => {
  newCustomers.forEach((_, index) => {
    if (dropdownStates.value[index] === undefined) {
      dropdownStates.value[index] = false;
    }
  });
}, { immediate: true });


const handleSearch = () => {
  // Triggers computed property update
};

const editCustomer = (customer) => {
    store.setCustomerToEdit(customer);
    router.push('/addCustomer')
};
const customerToDelete = ref();

const confirmDelete = (id) => {
    isVisible.value = true;
    customerToDelete.value = id
};
const handleDelete = async () => {
    try {
      await store.deleteCustomer(customerToDelete.value);
      toastStore.showToast({
        message: "Customer Deleted successfully",
        type: "success",
      });
      dropdownStates.value = {};
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('Failed to delete customer. Please try again.');
    }
};

const handleUpdate = (value) => {
  isVisible.value = value;
  dropdownStates.value = {};
};

</script>
  