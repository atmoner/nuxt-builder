<template>
  <label class="flex items-center gap-2 cursor-pointer">
    <input
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
    />
    <span class="text-sm text-gray-700" :class="{ 'opacity-50': disabled }">
      {{ label }}
    </span>
  </label>
</template>

<script setup lang="ts">
  defineProps<{
    label?: string
    checked?: boolean
    disabled?: boolean
  }>()
</script>
