<template>
  <div class="w-full">
    <label v-if="label" :for="selectId" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <select
      :id="selectId"
      :value="modelValue"
      :disabled="disabled"
      class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
             focus:outline-none focus:ring-primary-500 focus:border-primary-500 
             sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="option in parsedOptions" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string;
  label?: string;
  placeholder?: string;
  options?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  placeholder: '',
  options: '',
  disabled: false,
});

defineEmits<{
  'update:modelValue': [value: string];
}>();

const selectId = `select-${Math.random().toString(36).substr(2, 9)}`;

const parsedOptions = computed(() => {
  if (!props.options) return [];
  return props.options.split(',').map(o => o.trim()).filter(Boolean);
});
</script>
