<template>
  <div class="h-96">
          <div
            class="flex max-w-7xl items-center justify-between max-w-8xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div>
              <p class="font-medium text-2xl">customer management</p>
            </div>
            <div>
              <router-link to="addCustomer">
                <button
                class="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5 h-5">
                  <path
                  fill="currentColor"
                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
                  />
                </svg>
                <span>Add User</span>
              </button>
              </router-link>
            </div>
          </div>
          <div class="py-5">
            <customer-list />
          </div>
        </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import CustomerList from "../components/CustomerList.vue";
</script>

<style>

</style>