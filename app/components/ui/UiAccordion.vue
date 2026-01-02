<template>
  <div class="space-y-2">
    <div
      v-for="(item, index) in itemList"
      :key="index"
      class="border border-gray-200 rounded-lg overflow-hidden"
    >
      <button
        class="w-full px-4 py-3 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors"
        @click="toggle(Number(index))"
      >
        <span class="font-medium text-gray-900">{{ item.title }}</span>
        <svg
          class="w-5 h-5 text-gray-500 transition-transform"
          :class="{ 'rotate-180': openItems.has(Number(index)) }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="max-h-0 opacity-0"
        enter-to-class="max-h-96 opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="max-h-96 opacity-100"
        leave-to-class="max-h-0 opacity-0"
      >
        <div v-show="openItems.has(Number(index))" class="overflow-hidden">
          <div class="px-4 py-3 bg-gray-50 text-gray-700">
            {{ item.content }}
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    items?: string | Array<{ title: string; content: string }>
    allowMultiple?: boolean
    defaultOpen?: number
  }>()

  const openItems = ref<Set<number>>(new Set())

  const itemList = computed(() => {
    if (!props.items) return []
    if (typeof props.items === "string") {
      try {
        return JSON.parse(props.items)
      } catch {
        return []
      }
    }
    return props.items
  })

  onMounted(() => {
    if (props.defaultOpen !== undefined) {
      openItems.value.add(props.defaultOpen)
    }
  })

  const toggle = (index: number) => {
    if (openItems.value.has(index)) {
      openItems.value.delete(index)
    } else {
      if (!props.allowMultiple) {
        openItems.value.clear()
      }
      openItems.value.add(index)
    }
  }
</script>
