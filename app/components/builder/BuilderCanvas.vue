<template>
  <div
    class="flex-1 p-6 overflow-y-auto bg-gray-50"
    @dragover.prevent="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <div
      :class="[
        'drop-zone p-4',
        isDragOver ? 'drag-over' : '',
        components.length === 0 ? 'flex items-center justify-center' : '',
      ]"
    >
      <!-- Empty state -->
      <div v-if="components.length === 0" class="text-center text-gray-500">
        <svg
          class="w-16 h-16 mx-auto mb-4 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <p class="text-lg font-medium">Drag components here</p>
        <p class="text-sm mt-1">
          Start building your page by dragging components from the sidebar
        </p>
      </div>

      <!-- Components list -->
      <div v-else class="space-y-4">
        <BuilderComponentWrapper
          v-for="(component, index) in components"
          :key="component.id"
          :component="component"
          :index="index"
          :is-selected="selectedComponentId === component.id"
          @select="selectComponent(component.id)"
          @remove="removeComponent(component.id)"
          @duplicate="duplicateComponent(component.id)"
          @edit="$emit('edit', component.id)"
          @edit-child="handleEditChild"
          @move-up="moveUp(index)"
          @move-down="moveDown(index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const {
    components,
    selectedComponentId,
    isDragging,
    addComponent,
    removeComponent,
    selectComponent,
    duplicateComponent,
    moveComponent,
  } = useBuilder()

  const { getComponent } = useComponentRegistry()

  const emit = defineEmits<{
    edit: [id: string]
  }>()

  const isDragOver = ref(false)

  const handleDragOver = (event: DragEvent) => {
    if (
      isDragging.value ||
      event.dataTransfer?.types.includes("componentType")
    ) {
      isDragOver.value = true
    }
  }

  const handleDragLeave = () => {
    isDragOver.value = false
  }

  const handleDrop = (event: DragEvent) => {
    isDragOver.value = false

    const componentType = event.dataTransfer?.getData("componentType")
    if (componentType) {
      const definition = getComponent(componentType)
      if (definition) {
        addComponent(componentType, { ...definition.defaultProps })
      }
    }
  }

  const moveUp = (index: number) => {
    if (index > 0) {
      moveComponent(index, index - 1)
    }
  }

  const moveDown = (index: number) => {
    if (index < components.value.length - 1) {
      moveComponent(index, index + 1)
    }
  }

  const handleEditChild = (childId: string) => {
    selectComponent(childId)
    emit("edit", childId)
  }
</script>
