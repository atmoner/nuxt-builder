<template>
  <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
    <h3 class="text-lg font-medium leading-6 text-gray-900">
      <slot>{{ title }}</slot>
    </h3>
    <p v-if="subtitle" class="mt-1 text-sm text-gray-500">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  subtitle?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Card Header',
  subtitle: '',
});
</script>
