<template>
  <div class="relative inline-block text-left" ref="dropdownRef">
    <UiButton
      :label="buttonLabel"
      variant="outline"
      @click="isOpen = !isOpen"
    />
    
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <button
            v-for="(item, index) in parsedItems"
            :key="index"
            class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            @click="handleItemClick(item)"
          >
            {{ item }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';

interface Props {
  buttonLabel?: string;
  items?: string;
}

const props = withDefaults(defineProps<Props>(), {
  buttonLabel: 'Dropdown',
  items: 'Action 1, Action 2, Action 3',
});

const emit = defineEmits<{
  select: [item: string];
}>();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

onClickOutside(dropdownRef, () => {
  isOpen.value = false;
});

const parsedItems = computed(() => {
  if (!props.items) return [];
  return props.items.split(',').map(i => i.trim()).filter(Boolean);
});

const handleItemClick = (item: string) => {
  emit('select', item);
  isOpen.value = false;
};
</script>
