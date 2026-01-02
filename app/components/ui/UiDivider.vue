<template>
  <div class="flex items-center" :class="spacingClasses">
    <div v-if="!text" class="flex-1 border-t" :class="[borderClasses]" />
    <template v-else>
      <div class="flex-1 border-t" :class="[borderClasses]" />
      <span class="px-4 text-sm text-gray-500">{{ text }}</span>
      <div class="flex-1 border-t" :class="[borderClasses]" />
    </template>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    text?: string
    variant?: "solid" | "dashed" | "dotted"
    spacing?: "sm" | "md" | "lg"
  }>()

  const borderClasses = computed(() => {
    const variants = {
      solid: "border-solid",
      dashed: "border-dashed",
      dotted: "border-dotted",
    }
    return `${variants[props.variant || "solid"]} border-gray-300`
  })

  const spacingClasses = computed(() => {
    const spacings = {
      sm: "my-2",
      md: "my-4",
      lg: "my-8",
    }
    return spacings[props.spacing || "md"]
  })
</script>
