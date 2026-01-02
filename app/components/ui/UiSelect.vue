<template>
  <div class="space-y-2">
    <label v-if="label" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <select
      :disabled="disabled"
      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <option value="" disabled selected>{{ placeholder }}</option>
      <option
        v-for="(option, index) in optionList"
        :key="index"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    label?: string
    options?: string | string[]
    placeholder?: string
    disabled?: boolean
  }>()

  const optionList = computed(() => {
    if (!props.options) return ["Option 1", "Option 2", "Option 3"]
    if (Array.isArray(props.options)) return props.options
    return props.options.split(",").map((o) => o.trim())
  })
</script>
