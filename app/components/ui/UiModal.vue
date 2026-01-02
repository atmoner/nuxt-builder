<template>
  <div>
    <button
      class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
      @click="isOpen = true"
    >
      {{ buttonText }}
    </button>

    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            class="fixed inset-0 bg-black bg-opacity-50"
            @click="isOpen = false"
          />
          <div
            class="relative bg-white rounded-lg shadow-xl w-full"
            :class="sizeClasses"
          >
            <div
              class="flex items-center justify-between p-6 border-b border-gray-200"
            >
              <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
              <button
                class="text-gray-400 hover:text-gray-600 transition-colors"
                @click="isOpen = false"
              >
                <svg
                  class="w-6 h-6"
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
            <div class="p-6 text-gray-700">
              {{ content }}
            </div>
            <div class="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                @click="isOpen = false"
              >
                {{ cancelText }}
              </button>
              <button
                class="px-4 py-2 text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors"
                @click="handleConfirm"
              >
                {{ confirmText }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    buttonText?: string
    title?: string
    content?: string
    confirmText?: string
    cancelText?: string
    size?: "sm" | "md" | "lg" | "xl"
  }>()

  const isOpen = ref(false)

  const sizeClasses = computed(() => {
    const sizes = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
    }
    return sizes[props.size || "md"]
  })

  const handleConfirm = () => {
    isOpen.value = false
    // In a real app, you would emit an event or call a callback
  }
</script>
