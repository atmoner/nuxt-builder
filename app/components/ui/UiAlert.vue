<template>
  <div
    v-if="!dismissed"
    class="rounded-lg p-4 border"
    :class="alertClasses"
    role="alert"
  >
    <div class="flex items-start gap-3">
      <span class="text-xl">{{ icon }}</span>
      <div class="flex-1">
        <h4 v-if="title" class="font-semibold mb-1">{{ title }}</h4>
        <p class="text-sm">{{ message }}</p>
      </div>
      <button
        v-if="dismissible"
        class="text-gray-400 hover:text-gray-600 transition-colors"
        @click="dismissed = true"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    title?: string
    message?: string
    variant?: "info" | "success" | "warning" | "error"
    dismissible?: boolean
  }>()

  const dismissed = ref(false)

  const alertClasses = computed(() => {
    const variants = {
      info: "bg-blue-50 border-blue-200 text-blue-800",
      success: "bg-green-50 border-green-200 text-green-800",
      warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
      error: "bg-red-50 border-red-200 text-red-800",
    }
    return variants[props.variant || "info"]
  })

  const icon = computed(() => {
    const icons = {
      info: "ℹ️",
      success: "✅",
      warning: "⚠️",
      error: "❌",
    }
    return icons[props.variant || "info"]
  })
</script>
