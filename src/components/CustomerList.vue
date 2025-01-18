<template>
  <div
    class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border bg-white p-5 rounded-lg"
  >
    <!-- Desktop Table View -->
    <div class="hidden md:block overflow-x-auto">
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
        <tbody
          class="bg-white divide-y divide-gray-200"
          v-if="store.getAllCustomers.length > 0"
        >
          <tr
            v-for="(customer, index) in paginatedCustomers"
            :key="customer.id"
            class="border-b hover:bg-gray-200 cursor-pointer"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              {{ (currentPage - 1) * itemsPerPage + index + 1 }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ customer.firstName }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ customer.lastName }}
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
              <div class="relative">
                <button
                  @click="toggleDropdown(index)"
                  type="button"
                  class="inline-flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 128 512"
                  >
                    <path
                      d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"
                    />
                  </svg>
                </button>

                <!-- Dropdown Menu -->
                <div
                  v-if="dropdownStates[index]"
                  class="fixed transform translate-x-full -translate-y-1/5 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  style="z-index: 1000; right: 15%"
                >
                  <div class="py-1">
                    <router-link
                      :to="{
                        name: 'CustomerDetails',
                        params: { id: customer.id },
                      }"
                    >
                      <button
                        class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600"
                      >
                        View
                      </button>
                    </router-link>
                    <button
                      @click="editCustomer(customer)"
                      class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      @click="confirmDelete(customer.id)"
                      class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-100 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else class="text-center w-full">
          <tr>
            <td colspan="7" class="px-6 py-4 text-center text-gray-500">
              No customers found
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile Card View -->
    <div class="md:hidden space-y-4" v-if="store.getAllCustomers.length > 0">
      <div
        v-for="(customer, index) in paginatedCustomers"
        :key="customer.id"
        class="bg-white rounded-lg border p-4 relative"
      >
        <!-- Action Button -->
        <button
          @click="toggleDropdown(index)"
          class="absolute top-2 right-2 inline-flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 128 512"
          >
            <path
              d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"
            />
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <div
          v-if="dropdownStates[index]"
          class="absolute right-2 top-12 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
        >
          <div class="py-1">
            <router-link
              :to="{
                name: 'CustomerDetails',
                params: { id: customer.id },
              }"
            >
              <button
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600"
              >
                View
              </button>
            </router-link>
            <button
              @click="editCustomer(customer)"
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            >
              Edit
            </button>
            <button
              @click="confirmDelete(customer.id)"
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-100 hover:text-red-600"
            >
              Delete
            </button>
          </div>
        </div>

        <!-- Customer Information -->
        <div class="grid grid-cols-2 gap-2 mt-2">
          <div class="col-span-2">
            <p class="text-sm font-medium text-gray-900">
              {{ customer.firstName }} {{ customer.lastName }}
            </p>
            <p class="text-sm text-gray-500">{{ customer.email }}</p>
          </div>

          <div class="col-span-2 sm:col-span-1">
            <p class="text-xs text-gray-500">Phone</p>
            <p class="text-sm">{{ customer.phone }}</p>
          </div>

          <div class="col-span-2 sm:col-span-1">
            <p class="text-xs text-gray-500">State</p>
            <p class="text-sm">{{ customer.state }}</p>
          </div>

          <div class="col-span-2 flex items-center justify-between mt-2">
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
            <span class="text-xs text-gray-500">
              #{{ (currentPage - 1) * itemsPerPage + index + 1 }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="md:hidden p-4 text-center text-gray-500">
      No customers found
    </div>

    <!-- Pagination -->
    <div class="mt-4 flex items-center justify-between">
      <div class="flex">
        <button
          @click="goToPreviousPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 text-sm font-medium text-gray-600 bg-white border rounded-l-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          @click="goToNextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 text-sm font-medium text-gray-600 bg-white border rounded-r-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <div class="text-sm text-gray-500">
        Page {{ currentPage }} of {{ totalPages }}
      </div>
    </div>

    <ConfirmModal
      :isVisible="isVisible"
      :title="'Delete Customer'"
      :message="'Are you sure you want to delete this customer?'"
      @confirm="handleDelete"
      @update:isVisible="handleUpdate"
    ></ConfirmModal>
  </div>
</template>
  
  <script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useCustomerStore } from "../stores/customerStore";
import { useToastStore } from "../stores/toast";
import { useRouter } from "vue-router";
import ConfirmModal from "./ConfirmModal.vue";

const router = useRouter();
const dropdownStates = ref({});
const store = useCustomerStore();
const toastStore = useToastStore();
const isVisible = ref(false);

// Pagination logic
const itemsPerPage = 10;
const currentPage = ref(1);

const totalPages = computed(() =>
  Math.ceil(store.customers.length / itemsPerPage)
);

const paginatedCustomers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return store.filteredCustomers.slice(start, start + itemsPerPage);
});

const toggleDropdown = (index) => {
  dropdownStates.value[index] = !dropdownStates.value[index];
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) currentPage.value -= 1;
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value += 1;
};

const tableHeaders = [
  "#",
  "First Name",
  "Last Name",
  "Email",
  "Phone",
  "State",
  "Status",
];

watch(
  () => store.filteredCustomers,
  (newCustomers) => {
    newCustomers.forEach((_, index) => {
      if (dropdownStates.value[index] === undefined) {
        dropdownStates.value[index] = false;
      }
    });
  },
  { immediate: true }
);

const editCustomer = (customer) => {
  store.setCustomerToEdit(customer);
  router.push("/addCustomer");
};

const customerToDelete = ref();

const confirmDelete = (id) => {
  dropdownStates.value = {};
  isVisible.value = true;
  customerToDelete.value = id;
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
    console.error("Error deleting customer:", error);
    alert("Failed to delete customer. Please try again.");
  }
};

const handleUpdate = (value) => {
  isVisible.value = value;
  dropdownStates.value = {};
};
</script>