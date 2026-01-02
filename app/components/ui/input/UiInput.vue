<template>
  <div class="w-full">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
             placeholder-gray-400 focus:outline-none focus:ring-primary-500 
             focus:border-primary-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-if="hint && !error" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  disabled?: boolean;
  required?: boolean;
  error?: string;
  hint?: string;
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  placeholder: '',
  type: 'text',
  disabled: false,
  required: false,
  error: '',
  hint: '',
});

defineEmits<{
  'update:modelValue': [value: string];
}>();

const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;
</script>
