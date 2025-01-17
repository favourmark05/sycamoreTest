<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside
      class="w-64 z-50 bg-gray-50 text-gray flex-shrink-0 fixed inset-y-0 left-0 transform -translate-x-full md:translate-x-0 md:static transition-transform duration-300"
      :class="{ 'translate-x-0': sidebarOpen }"
    >
      <div class="p-4">
        <h2 class="text-lg font-bold">
          <img src="../assets/logo.png" alt="" />
        </h2>
        <nav class="mt-4">
          <ul>
            <li class="my-2">
              <router-link
                to="/"
                :class="{
                  'text-purple-600 bg-purple-100': isActive('/'),
                  'text-gray-500': !isActive('/'),
                }"
                class="flex items-center py-2 px-4 space-x-3 rounded text-gray-400 hover:text-purple-600 hover:bg-purple-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  class="w-5 h-5"
                >
                  <path
                    fill="currentColor"
                    d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
                  />
                </svg>
                <span class="text-sm font-medium font-extrabold"
                  >Dashboard</span
                >
              </router-link>
            </li>
            <li class="my-2">
              <router-link
                to="/usersPage"
                :class="{
                  'text-purple-600 bg-purple-100': isActive('/usersPage'),
                  'text-gray-500': !isActive('/usersPage'),
                }"
                class="flex items-center py-2 px-4 space-x-3 rounded text-gray-400 hover:text-purple-600 hover:bg-purple-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  class="w-5 h-5"
                >
                  <path
                    fill="currentColor"
                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
                  />
                </svg>
                <span class="text-sm font-medium font-extrabold">User</span>
              </router-link>
            </li>
            <li class="my-2">
              <a
                href="#"
                class="flex items-center py-2 px-4 space-x-3 rounded text-gray-400 hover:text-purple-600 hover:bg-purple-100"
              >
                <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                <span class="text-sm font-medium font-extrabold">Category</span>
              </a>
            </li>
            <li class="my-2">
              <a
                href="#"
                class="flex items-center py-2 px-4 space-x-3 rounded text-gray-400 hover:text-purple-600 hover:bg-purple-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  class="w-5 h-5"
                >
                  <path
                    fill="currentColor"
                    d="M58.9 42.1c3-6.1 9.6-9.6 16.3-8.7L320 64 564.8 33.4c6.7-.8 13.3 2.7 16.3 8.7l41.7 83.4c9 17.9-.6 39.6-19.8 45.1L439.6 217.3c-13.9 4-28.8-1.9-36.2-14.3L320 64 236.6 203c-7.4 12.4-22.3 18.3-36.2 14.3L37.1 170.6c-19.3-5.5-28.8-27.2-19.8-45.1L58.9 42.1zM321.1 128l54.9 91.4c14.9 24.8 44.6 36.6 72.5 28.6L576 211.6l0 167c0 22-15 41.2-36.4 46.6l-204.1 51c-10.2 2.6-20.9 2.6-31 0l-204.1-51C79 419.7 64 400.5 64 378.5l0-167L191.6 248c27.8 8 57.6-3.8 72.5-28.6L318.9 128l2.2 0z"
                  />
                </svg>
                <span class="text-sm font-medium font-extrabold">Product</span>
              </a>
            </li>
            <hr class="my-4" />
            <li class="my-2">
              <a
                href="#"
                class="flex items-center py-2 px-4 space-x-3 rounded text-gray-400 hover:text-purple-600 hover:bg-purple-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  class="w-5 h-5"
                >
                  <path
                    fill="currentColor"
                    d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"
                  />
                </svg>
                <span class="text-sm font-medium">Settings</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col ml-0">
      <!-- Header -->
      <header
        class="bg-gray-50 shadow px-4 py-2 flex items-center justify-between border"
      >
        <div class="flex items-center justify-between p-4 w-full">
          <!-- Search Input -->
          <SearchInput
            v-model="searchQuery"
            @search="handleSearch"
            v-if="$route.name === 'UsersPage' || $route.name === 'CustomerForm'"
          />

          <!-- Notification and Profile -->
          <div class="flex items-center space-x-4">
            <!-- Notification Icon -->
            <button class="relative">
              <svg
                class="w-6 h-6 text-gray-600 ml-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-5-5.917V4a2 2 0 10-4 0v1.083A6.002 6.002 0 004 11v3.159c0 .417-.162.818-.451 1.118L2 17h5m4 0v1a3 3 0 006 0v-1m-6 0a3.001 3.001 0 01-5.995-.15"
                />
              </svg>
              <!-- Notification Badge (if needed) -->
              <span
                class="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"
              ></span>
            </button>

            <!-- Profile Section -->
            <div class="flex items-center space-x-2">
              <img
                src="../assets/avater.jpeg"
                alt="User Avatar"
                class="w-16 h-8 md:w-10 md:h-10 rounded-full object-cover object-center flex-shrink-0"
              />
              <span class="hidden md:block text-gray-700 font-medium"
                >Mfonido Mark</span
              >
            </div>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="sidebarOpen = !sidebarOpen"
          class="md:hidden bg-gray-800 text-white p-2 rounded"
        >
          <svg
            class="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
        </button>
      </header>

      <!-- Scrollable Content -->
      <main class="flex-1 overflow-y-auto bg-gray-200 p-4">
        <div class="h-100 flex" v-if="$route.name === 'Home'">
          <div class="pt-14 text-center welcome">
            <h1
              class="text-4xl sm:text-5xl md:text-6xl font-semibold text-gray-900 leading-tight max-w-7xl"
            >
              Welcome to Sycamore Customer Management Dashboard
            </h1>
            <p class="mt-4 text-lg text-gray-600">
              Manage your customer base efficiently with our intuitive tools and
              analytics.
            </p>
          </div>
        </div>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
  
<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import CustomerForm from "../components/CustomerForm.vue";
import SearchInput from "../components/SearchInput.vue";
import { useCustomerStore } from "@/stores/customerStore.js";

const route = useRoute();
const store = useCustomerStore();
const searchQuery = ref("");
const sidebarOpen = ref(false);
const showForm = ref(false);
const editingCustomer = ref(null);

const handleFormSubmit = () => {
  showForm.value = false;
  editingCustomer.value = null;
};

const isActive = (path) => {
  return route.path === path;
};

const handleSearch = () => {
  store.searchCustomers(searchQuery.value);
};

const handleEdit = (customer) => {
  editingCustomer.value = customer;
  showForm.value = true;
};
</script>
  
  <style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
.welcome {
  /* display: flex; */
  margin: auto;
  margin-top: 15%;
}
</style>