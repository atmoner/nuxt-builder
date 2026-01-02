<template>
  <aside class="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
    <div class="p-4 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900">Components</h2>
      <p class="text-sm text-gray-500 mt-1">Drag components to the canvas</p>
    </div>

    <div class="p-4 space-y-2">
      <div
        v-for="category in categories"
        :key="category"
        class="border border-gray-200 rounded-lg overflow-hidden"
      >
        <button
          class="w-full px-3 py-2 flex items-center justify-between text-left bg-gray-50 hover:bg-gray-100 transition-colors"
          @click="toggleCategory(category)"
        >
          <h3
            class="text-xs font-semibold text-gray-700 uppercase tracking-wider"
          >
            {{ category }}
          </h3>
          <svg
            class="w-4 h-4 text-gray-500 transition-transform"
            :class="{ 'rotate-180': openCategories.has(category) }"
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
          enter-to-class="max-h-[500px] opacity-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="max-h-[500px] opacity-100"
          leave-to-class="max-h-0 opacity-0"
        >
          <div v-show="openCategories.has(category)" class="overflow-hidden">
            <div class="p-2 space-y-2 bg-white">
              <div
                v-for="component in getComponentsByCategory(category)"
                :key="component.type"
                class="component-item flex items-center gap-3"
                draggable="true"
                @dragstart="handleDragStart($event, component.type)"
                @dragend="handleDragEnd"
              >
                <span class="text-xl">{{ component.icon }}</span>
                <span class="text-sm font-medium text-gray-700">{{
                  component.name
                }}</span>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Actions -->
    <div class="p-4 border-t border-gray-200 space-y-2">
      <button
        class="w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors"
        @click="$emit('export')"
      >
        Export Layout
      </button>
      <button
        class="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        @click="$emit('import')"
      >
        Import Layout
      </button>
      <button
        class="w-full px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
        @click="$emit('clear')"
      >
        Clear All
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
  const { getAllComponents, getComponentsByCategory, getCategories } =
    useComponentRegistry()
  const { startDrag, endDrag } = useBuilder()

  defineEmits<{
    export: []
    import: []
    clear: []
  }>()

  const categories = computed(() => getCategories())

  // Track which categories are open (all closed by default)
  const openCategories = ref<Set<string>>(new Set())

  const toggleCategory = (category: string) => {
    if (openCategories.value.has(category)) {
      openCategories.value.delete(category)
    } else {
      openCategories.value.add(category)
    }
  }

  const handleDragStart = (event: DragEvent, componentType: string) => {
    if (event.dataTransfer) {
      event.dataTransfer.setData("componentType", componentType)
      event.dataTransfer.effectAllowed = "copy"
    }
    startDrag(componentType)
  }

  const handleDragEnd = () => {
    endDrag()
  }
</script>
