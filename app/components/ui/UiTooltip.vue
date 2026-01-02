<template>
  <div class="relative inline-block">
    <div
      class="cursor-help"
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
    >
      {{ text }}
    </div>
    <Transition
      enter-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="showTooltip"
        class="absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap"
        :class="tooltipPositionClasses"
      >
        {{ tooltip }}
        <div
          class="absolute w-2 h-2 bg-gray-900 transform rotate-45"
          :class="arrowClasses"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    text?: string
    tooltip?: string
    position?: "top" | "bottom" | "left" | "right"
  }>()

  const showTooltip = ref(false)

  const tooltipPositionClasses = computed(() => {
    const positions = {
      top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
      bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
      left: "right-full top-1/2 -translate-y-1/2 mr-2",
      right: "left-full top-1/2 -translate-y-1/2 ml-2",
    }
    return positions[props.position || "top"]
  })

  const arrowClasses = computed(() => {
    const arrows = {
      top: "top-full left-1/2 -translate-x-1/2 -mt-1",
      bottom: "bottom-full left-1/2 -translate-x-1/2 -mb-1",
      left: "left-full top-1/2 -translate-y-1/2 -ml-1",
      right: "right-full top-1/2 -translate-y-1/2 -mr-1",
    }
    return arrows[props.position || "top"]
  })
</script>
