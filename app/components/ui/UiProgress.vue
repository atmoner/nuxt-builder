<template>
  <div class="space-y-2">
    <div v-if="label || showLabel" class="flex justify-between items-center">
      <span class="text-sm font-medium text-gray-700">
        {{ label || "Progress" }}
      </span>
      <span class="text-sm font-medium text-gray-700">{{ percentage }}%</span>
    </div>
    <div
      class="w-full bg-gray-200 rounded-full overflow-hidden"
      :class="sizeClasses"
    >
      <div
        class="h-full rounded-full transition-all duration-300"
        :class="variantClasses"
        :style="{ width: `${percentage}%` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    value?: number
    max?: number
    label?: string
    showLabel?: boolean
    variant?: "primary" | "success" | "warning" | "error"
    size?: "sm" | "md" | "lg"
  }>()

  const percentage = computed(() => {
    const maxVal = props.max || 100
    const val = props.value || 0
    return Math.min(Math.round((val / maxVal) * 100), 100)
  })

  const sizeClasses = computed(() => {
    const sizes = {
      sm: "h-1.5",
      md: "h-2.5",
      lg: "h-4",
    }
    return sizes[props.size || "md"]
  })

  const variantClasses = computed(() => {
    const variants = {
      primary: "bg-primary-600",
      success: "bg-green-600",
      warning: "bg-yellow-500",
      error: "bg-red-600",
    }
    return variants[props.variant || "primary"]
  })
</script>
