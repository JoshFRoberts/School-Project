<template>
    <WaveDiv waveStyle="curved" :color="useThemeColor('ffffff', '111827')" />
    <div class="w-full bg-white dark:bg-dark-background-LightGray mx-auto px-32 py-12 -mt-16 mb-8 rounded-lg">
      <h2 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
        <LastWordsRecolor
          text="Kontaktieren Sie uns!"
          :wordsToRecolor="1"
          styleVariant="water"
          position="start"
        />
      </h2>
  
      <form @submit.prevent="submitForm" class="space-y-6 max-w-2xl mx-auto">
  <!-- Name Field -->
  <div>
    <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
    <input
      id="name"
      v-model="form.name"
      type="text"
      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-800 dark:text-white"
      :class="{ 'border-red-500 dark:border-red-400': errors.name }"
      placeholder="Dein Name"
    />
    <p v-if="errors.name" class="mt-1 text-sm text-red-600 dark:text-red-400">
      {{ errors.name }}
    </p>
  </div>

  <!-- Email Field -->
  <div>
    <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
    <input
      id="email"
      v-model="form.email"
      type="email"
      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-800 dark:text-white"
      :class="{ 'border-red-500 dark:border-red-400': errors.email }"
      placeholder="deine.email@beispiel.com"
    />
    <p v-if="errors.email" class="mt-1 text-sm text-red-600 dark:text-red-400">
      {{ errors.email }}
    </p>
  </div>

  <!-- Message Field -->
  <div>
    <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nachricht</label>
    <textarea
      id="message"
      v-model="form.message"
      rows="4"
      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-800 dark:text-white"
      :class="{ 'border-red-500 dark:border-red-400': errors.message }"
      placeholder="Deine Nachricht hier..."
    ></textarea>
    <p v-if="errors.message" class="mt-1 text-sm text-red-600 dark:text-red-400">
      {{ errors.message }}
    </p>
  </div>

  <!-- Submit Button -->
  <div>
    <button
      type="submit"
      class="w-full bg-cyan-700 dark:bg-cyan-800 hover:bg-cyan-800 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex justify-center items-center dark:hover:bg-cyan-700"
      :disabled="isSubmitting"
    >
      <svg
        v-if="isSubmitting"
        class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {{ isSubmitting ? "Sending..." : "Send Message" }}
    </button>
  </div>
</form>

  
      <!-- Success/Error Message -->
      <div
        v-if="formStatus.show"
        class="mt-8 p-3 rounded-md mx-64"
        :class="formStatus.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'"
      >
        {{ formStatus.message }}
      </div>
    </div>
    <WaveDiv rotate :color="useThemeColor('ffffff', '111827')" waveStyle="smooth" />
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from "vue";
  import emailjs from "emailjs-com";
  import WaveDiv from "./WaveDiv.vue";
  import LastWordsRecolor from "./LastWordsRecolor.tsx";
  import { useThemeColor } from './getThemeColor';
  
  interface FormData {
    name: string;
    email: string;
    message: string;
  }
  
  interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
  }
  
  interface FormStatus {
    show: boolean;
    message: string;
    isError: boolean;
  }
  
  const form = reactive<FormData>({
    name: "",
    email: "",
    message: "",
  });
  
  const errors = reactive<FormErrors>({});
  const isSubmitting = ref(false);
  const formStatus = reactive<FormStatus>({
    show: false,
    message: "",
    isError: false,
  });
  
  const validateForm = (): boolean => {
    let isValid = true;
    errors.name = undefined;
    errors.email = undefined;
    errors.message = undefined;
  
    if (!form.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }
  
    if (!form.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }
  
    if (!form.message.trim()) {
      errors.message = "Message is required";
      isValid = false;
    }
  
    return isValid;
  };
  
  const submitForm = async () => {
    formStatus.show = false;
  
    if (!validateForm()) {
      return;
    }
  
    isSubmitting.value = true;
  
    try {
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      };
  
      const serviceID = "service_3cc4vtr"; 
      const templateID = "template_ajt5jyx";
      const userID = "phiBmLpv_4i2jVTcb"; 
  
      const response = await emailjs.send(serviceID, templateID, templateParams, userID);
  
      formStatus.show = true;
      formStatus.isError = false;
      formStatus.message = "Your message has been sent successfully!";
  
      form.name = "";
      form.email = "";
      form.message = "";
    } catch (error) {
      formStatus.show = true;
      formStatus.isError = true;
      formStatus.message = "Failed to send message. Please try again later.";
      console.error("EmailJS error:", error);
    } finally {
      isSubmitting.value = false;
    }
  };
  </script>
  