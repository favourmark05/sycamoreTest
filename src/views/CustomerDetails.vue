<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border bg-white p-5 rounded-lg">
      <div v-if="customer" class="space-y-6">
        <!-- Header -->
        <div class="flex justify-between items-center border-b pb-4">
          <h1 class="text-2xl font-semibold text-gray-900">
            {{ customer.firstName }} {{ customer.lastName }}
          </h1>
          <span
            :class="[
              'px-3 py-1 text-sm font-semibold rounded-full',
              customer.isActive
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            ]"
          >
            {{ customer.isActive ? "Active" : "Inactive" }}
          </span>
        </div>
  
        <!-- Customer Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <label class="text-sm font-medium text-gray-500">Email</label>
              <p class="mt-1 text-gray-900">{{ customer.email }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-500">Phone</label>
              <p class="mt-1 text-gray-900">{{ customer.phone }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-500">State</label>
              <p class="mt-1 text-gray-900">{{ customer.state }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-500">Details</label>
              <p class="mt-1 text-gray-900" v-html="customer.details"></p>
            </div>
          </div>
        </div>
  
        <!-- Action Buttons -->
        <div class="flex space-x-4 pt-4 border-t">
          <button
            @click="editCustomer"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Edit Customer
          </button>
          <button
            @click="goBack"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Back to List
          </button>
        </div>
      </div>
  
      <div v-else class="text-center py-8">
        <p class="text-gray-500">Loading customer details...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useCustomerStore } from '../stores/customerStore'
  
  const route = useRoute()
  const router = useRouter()
  const store = useCustomerStore()
  const customer = ref(null)
  
  onMounted(async () => {
    const customerId = route.params.id
    // Assuming you have a method to get a single customer in your store
    // If not, you can filter from the existing customers
    customer.value = store.customers.find(c => c.id === customerId)
    
    if (!customer.value) {
      // Handle customer not found
      router.push('/') // or show an error message
    }
  })
  
  const editCustomer = () => {
    store.setCustomerToEdit(customer.value)
    router.push('/addCustomer')
  }
  
  const goBack = () => {
    router.back()
  }
  </script>