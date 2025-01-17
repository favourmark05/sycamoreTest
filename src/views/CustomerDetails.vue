<template>
  <div
    class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border bg-white p-8 shadow-md rounded-lg"
  >
    <div v-if="customer" class="space-y-8">
      <!-- Header -->
      <div class="flex justify-between items-center border-b pb-6">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ customer.firstName }} {{ customer.lastName }}
        </h1>
        <span
          :class="[
            'px-4 py-1 text-sm font-semibold rounded-full shadow-sm',
            customer.isActive
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800',
          ]"
        >
          {{ customer.isActive ? "Active" : "Inactive" }}
        </span>
      </div>

      <!-- Customer Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-6">
          <div>
            <label class="text-sm font-medium text-gray-600">Email</label>
            <p class="mt-1 text-lg text-gray-900 font-medium">
              {{ customer.email }}
            </p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Phone</label>
            <p class="mt-1 text-lg text-gray-900 font-medium">
              {{ customer.phone }}
            </p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">State</label>
            <p class="mt-1 text-lg text-gray-900 font-medium">
              {{ customer.state }}
            </p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Details</label>
            <p
              class="mt-1 text-lg text-gray-900 font-medium"
              v-html="customer.details"
            ></p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap space-x-4 pt-6 border-t">
        <button
          @click="editCustomer"
          class="px-6 py-3 bg-purple-600 text-white rounded-lg bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Edit Customer
        </button>
        <button
          @click="goBack"
          class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300"
        >
          Back to List
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="text-center py-16">
      <p class="text-lg text-gray-500">Loading customer details...</p>
      <div class="mt-4">
        <div class="h-1 w-24 bg-gray-300 animate-pulse mx-auto rounded"></div>
      </div>
    </div>
  </div>
</template>

  
  <script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCustomerStore } from "../stores/customerStore";
import { useToastStore } from "../stores/toast";

const route = useRoute();
const router = useRouter();
const store = useCustomerStore();
const customer = ref(null);
const toastStore = useToastStore();

onMounted(async () => {
  const customerId = route.params.id;
  customer.value = store.customers.find((c) => c.id === customerId);

  if (!customer.value) {
    toastStore.showToast({
      message: "Customer Not found",
      type: "error",
    });
    router.push("/usersPage")
  }
});

const editCustomer = () => {
  store.setCustomerToEdit(customer.value);
  router.push("/addCustomer");
};

const goBack = () => {
  router.back();
};
</script>