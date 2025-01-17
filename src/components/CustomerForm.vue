<template>
  <div class="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-semibold mb-6">
      {{ isEditing ? "Edit Customer" : "Add New Customer" }}
    </h2>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- First Name Field -->
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >First Name</label
          >
          <input
            v-model="formData.firstName"
            placeholder="Enter First Name"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500"
            :class="{ 'border-red-500': errors.firstName }"
          />
          <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">
            {{ errors.firstName }}
          </p>
        </div>

        <!-- Last Name Field -->
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Last Name</label
          >
          <input
            v-model="formData.lastName"
            placeholder="Enter Last Name"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500"
            :class="{ 'border-red-500': errors.lastName }"
          />
          <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">
            {{ errors.lastName }}
          </p>
        </div>

        <!-- Email Field -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="formData.email"
            placeholder="Enter Valid Email Address"
            type="email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500"
            :class="{ 'border-red-500': errors.email }"
          />
          <p v-if="errors.email" class="mt-1 text-sm text-red-600">
            {{ errors.email }}
          </p>
        </div>

        <!-- Phone Number Field -->
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Phone Number</label
          >
          <input
            v-model="formData.phone"
            placeholder="Enter Valid Phone Number"
            type="tel"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500"
            :class="{ 'border-red-500': errors.phone }"
          />
          <p v-if="errors.phone" class="mt-1 text-sm text-red-600">
            {{ errors.phone }}
          </p>
        </div>

        <!-- State Field -->
        <div>
          <label class="block text-sm font-medium text-gray-700">State</label>
          <select
            v-model="formData.state"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500"
            :class="{ 'border-red-500': errors.state }"
          >
            <option value="">Select a state</option>
            <option v-for="state in nigerianStates" :key="state" :value="state">
              {{ state }}
            </option>
          </select>
          <p v-if="errors.state" class="mt-1 text-sm text-red-600">
            {{ errors.state }}
          </p>
        </div>
      </div>

      <!-- Active Status -->
      <div class="flex items-center">
        <input
          v-model="formData.isActive"
          type="checkbox"
          class="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label class="ml-2 block text-sm text-gray-900">Set to active</label>
      </div>

      <!-- Customer Details Editor -->
      <div>
        <label class="block text-sm font-medium text-gray-700"
          >Customer Details</label
        >
        <vue-editor v-model="formData.details" class="mt-1"></vue-editor>
        <p v-if="errors.details" class="mt-1 text-sm text-red-600">
          {{ errors.details }}
        </p>
      </div>

      <!-- Submit Button -->
      <div class="flex space-x-4">
        <button
          type="button"
          @click="cancelEdit"
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          :disabled="isSubmitting"
        >
          {{
            isSubmitting
              ? "Submitting..."
              : isEditing
              ? "Update Customer"
              : "Add Customer"
          }}
        </button>
      </div>
    </form>
  </div>
</template>
  
<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import { VueEditor } from "vue3-editor";
import { useCustomerStore } from "../stores/customerStore";
import { useToastStore } from "../stores/toast";
import { useValidation } from "../plugins/validation";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const store = useCustomerStore();
const toastStore = useToastStore();
const showAlert = ref(false);
const { validateEmail, validatePhone, validateRequired } = useValidation();

const formData = ref({
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  state: "",
  isActive: false,
  details: "",
});

const errors = reactive({});
const isSubmitting = ref(false);
const isEditing = computed(() => !!formData.value.id);

const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

watch(
  () => store.customerToEdit,
  (newCustomer) => {
    if (newCustomer) {
      formData.value = { ...newCustomer };
      isEditing.value = true;
    } else {
      formData.value = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        state: "",
        isActive: false,
      };
      isEditing.value = false;
    }
  },
  { immediate: true }
);

onMounted(() => {
  const customerToEdit = store.customerToEdit;
  if (customerToEdit) {
    Object.assign(formData.value, customerToEdit);
  }
});

const validateForm = () => {
  const newErrors = {
    firstName: !formData.value.firstName?.trim()
      ? "First name is required"
      : "",
    lastName: !formData.value.lastName?.trim() ? "Last name is required" : "",
    email: !validateEmail(formData.value.email)
      ? "Valid email is required"
      : "",
    phone: !validatePhone(formData.value.phone)
      ? "Valid phone number is required"
      : "",
    state: !formData.value.state ? "State is required" : "",
    details: !formData.value.details?.trim()
      ? "Customer details are required"
      : "",
  };

  // Update the reactive errors object
  Object.assign(errors, newErrors);

  // Return true if there are no errors
  return Object.values(newErrors).every((error) => !error);
};

const handleSubmit = async () => {
  if (isSubmitting.value) return;

  try {
    isSubmitting.value = true;

    // Validate the form
    if (!validateForm()) {
      isSubmitting.value = false;
      return;
    }

    if (isEditing.value) {
      await store.updateCustomer(formData.value);
      router.push("/usersPage");
      toastStore.showToast({
        message: "Customer added successfully",
        type: "success",
        life: 10000
      });
      console.log("Customer updated:", formData.value);
    } else {
      await store.addCustomer(formData.value);
      toastStore.showToast({
        message: "Customer added successfully",
        type: "success",
        life: 10000
      });
      router.push("/usersPage");
      console.log("Customer added:", formData.value);
    }

    // Clear the customerToEdit in store
    store.setCustomerToEdit(null);

    // Navigate back to the customer list
    
  } catch (error) {
    console.error("Error saving customer:", error);
    alert("Failed to save customer. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
};

const cancelEdit = () => {
  // Clear the customerToEdit in store
  store.setCustomerToEdit(null);
  router.push("/usersPage");
};
const closeAlert = () => {
  showAlert.value = false;
};

</script>