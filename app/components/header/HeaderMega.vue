<template>
  <header
    :class="[
      'px-6 py-4 border-b',
      theme === 'light'
        ? 'bg-white border-gray-200'
        : 'bg-gray-900 border-gray-800',
    ]"
  >
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <!-- Logo -->
      <div
        :class="[
          'text-xl font-bold',
          theme === 'light' ? 'text-gray-900' : 'text-white',
        ]"
      >
        {{ logo }}
      </div>

      <!-- Navigation with dropdowns -->
      <nav class="hidden md:flex items-center gap-6">
        <div class="relative group">
          <button
            :class="[
              'flex items-center gap-1 font-medium transition-colors',
              theme === 'light'
                ? 'text-gray-600 hover:text-gray-900'
                : 'text-gray-300 hover:text-white',
            ]"
          >
            Products
            <svg
              v-if="showDropdown"
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        <div class="relative group">
          <button
            :class="[
              'flex items-center gap-1 font-medium transition-colors',
              theme === 'light'
                ? 'text-gray-600 hover:text-gray-900'
                : 'text-gray-300 hover:text-white',
            ]"
          >
            Solutions
            <svg
              v-if="showDropdown"
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        <a
          href="#"
          :class="[
            'font-medium transition-colors',
            theme === 'light'
              ? 'text-gray-600 hover:text-gray-900'
              : 'text-gray-300 hover:text-white',
          ]"
        >
          Pricing
        </a>
        <a
          href="#"
          :class="[
            'font-medium transition-colors',
            theme === 'light'
              ? 'text-gray-600 hover:text-gray-900'
              : 'text-gray-300 hover:text-white',
          ]"
        >
          Resources
        </a>
      </nav>

      <!-- CTA -->
      <div class="flex items-center gap-4">
        <a
          href="#"
          :class="[
            'font-medium transition-colors',
            theme === 'light'
              ? 'text-gray-600 hover:text-gray-900'
              : 'text-gray-300 hover:text-white',
          ]"
        >
          Sign in
        </a>
        <a
          :href="buttonUrl"
          class="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          {{ buttonText }}
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  interface Props {
    logo?: string
    showDropdown?: boolean
    buttonText?: string
    buttonUrl?: string
    theme?: "light" | "dark"
    backgroundColor?: string
  }

  withDefaults(defineProps<Props>(), {
    logo: "Enterprise",
    showDropdown: true,
    buttonText: "Contact Sales",
    buttonUrl: "#",
    theme: "light",
    backgroundColor: "",
  })
</script>
