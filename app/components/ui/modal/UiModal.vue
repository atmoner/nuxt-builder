<template>
  <div>
    <UiButton :label="buttonLabel" @click="isOpen = true" />
    
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <!-- Backdrop -->
            <div 
              class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              @click="isOpen = false"
            />
            
            <!-- Modal Content -->
            <div class="relative bg-white rounded-lg shadow-xl max-w-lg w-full transform transition-all">
              <!-- Header -->
              <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
                <button
                  v-if="showCloseButton"
                  class="text-gray-400 hover:text-gray-600 transition-colors"
                  @click="isOpen = false"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <!-- Body -->
              <div class="px-6 py-4">
                <slot>{{ content }}</slot>
              </div>
              
              <!-- Footer -->
              <div class="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
                <UiButton variant="outline" label="Cancel" @click="isOpen = false" />
                <UiButton label="Confirm" @click="handleConfirm" />
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
interface Props {
  buttonLabel?: string;
  title?: string;
  content?: string;
  showCloseButton?: boolean;
}

withDefaults(defineProps<Props>(), {
  buttonLabel: 'Open Modal',
  title: 'Modal Title',
  content: 'Modal content goes here...',
  showCloseButton: true,
});

const emit = defineEmits<{
  confirm: [];
  cancel: [];
}>();

const isOpen = ref(false);

const handleConfirm = () => {
  emit('confirm');
  isOpen.value = false;
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
