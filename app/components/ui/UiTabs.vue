<template>
  <div class="w-full">
    <div class="border-b border-gray-200" :class="tabsClasses">
      <nav class="flex gap-1" :class="navClasses">
        <button
          v-for="(tab, index) in tabList"
          :key="index"
          class="px-4 py-2 text-sm font-medium transition-colors"
          :class="getTabClasses(index)"
          @click="activeTab = index"
        >
          {{ tab }}
        </button>
      </nav>
    </div>
    <div class="p-4">
      <div v-for="(content, index) in contentList" :key="index">
        <div v-show="activeTab === index">{{ content }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    tabs?: string | string[]
    contents?: string | string[]
    defaultTab?: number
    variant?: "underline" | "pills" | "bordered"
  }>()

  const activeTab = ref(props.defaultTab || 0)

  const tabList = computed(() => {
    if (!props.tabs) return ["Tab 1", "Tab 2", "Tab 3"]
    if (Array.isArray(props.tabs)) return props.tabs
    return props.tabs.split(",").map((t) => t.trim())
  })

  const contentList = computed(() => {
    if (!props.contents) return ["Content 1", "Content 2", "Content 3"]
    if (Array.isArray(props.contents)) return props.contents
    return props.contents.split(",").map((c) => c.trim())
  })

  const tabsClasses = computed(() => {
    return props.variant === "bordered" ? "border rounded-lg" : ""
  })

  const navClasses = computed(() => {
    return props.variant === "pills" ? "p-1 bg-gray-100 rounded-lg" : ""
  })

  const getTabClasses = (index: number) => {
    const isActive = activeTab.value === index

    if (props.variant === "pills") {
      return isActive
        ? "bg-white text-primary-600 rounded-md shadow-sm"
        : "text-gray-600 hover:text-gray-900"
    }

    if (props.variant === "bordered") {
      return isActive
        ? "border-b-2 border-primary-600 text-primary-600"
        : "text-gray-600 hover:text-gray-900"
    }

    // underline (default)
    return isActive
      ? "border-b-2 border-primary-600 text-primary-600"
      : "text-gray-600 hover:text-gray-900 border-b-2 border-transparent"
  }
</script>
