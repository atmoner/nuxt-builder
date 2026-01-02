<template>
  <div class="w-full">
    <!-- Grid Controls Bar -->
    <div class="flex items-center gap-2 mb-3 p-2 bg-gray-100 rounded-lg">
      <span class="text-xs font-medium text-gray-600">Layout:</span>

      <!-- Preset Layouts -->
      <div class="flex gap-1">
        <button
          v-for="preset in layoutPresets"
          :key="preset.name"
          :title="preset.name"
          :class="[
            'px-2 py-1 text-xs rounded transition-all',
            isPresetActive(preset.widths)
              ? 'bg-primary-500 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-200',
          ]"
          @click="applyPreset(preset.widths)"
        >
          {{ preset.label }}
        </button>
      </div>

      <div class="h-4 w-px bg-gray-300 mx-1"></div>

      <!-- Column Count -->
      <div class="flex items-center gap-1">
        <button
          class="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded disabled:opacity-50"
          :disabled="columnWidths.length <= 1"
          title="Remove column"
          @click="removeColumn"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 12H4"
            />
          </svg>
        </button>
        <span
          class="text-xs font-medium text-gray-600 min-w-[60px] text-center"
        >
          {{ columnWidths.length }} col{{ columnWidths.length > 1 ? "s" : "" }}
        </span>
        <button
          class="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded disabled:opacity-50"
          :disabled="columnWidths.length >= 6"
          title="Add column"
          @click="addColumn"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>

      <div class="h-4 w-px bg-gray-300 mx-1"></div>

      <!-- Gap Control -->
      <div class="flex items-center gap-1">
        <span class="text-xs text-gray-500">Gap:</span>
        <select
          :value="gap"
          class="text-xs border border-gray-300 rounded px-1 py-0.5"
          @change="
            $emit('update:gap', ($event.target as HTMLSelectElement).value)
          "
        >
          <option value="0">None</option>
          <option value="2">S</option>
          <option value="4">M</option>
          <option value="6">L</option>
          <option value="8">XL</option>
        </select>
      </div>
    </div>

    <!-- Column Width Indicators -->
    <div class="flex gap-1 mb-2" :style="{ gap: `${parseInt(gap) * 4}px` }">
      <div
        v-for="(width, index) in columnWidths"
        :key="'indicator-' + index"
        class="text-center"
        :style="{ flex: width }"
      >
        <div
          class="flex items-center justify-center gap-1 text-xs text-gray-500 bg-gray-100 rounded py-0.5 px-1"
        >
          <button
            class="hover:text-primary-600 disabled:opacity-30"
            :disabled="width <= 1"
            @click="decreaseColumnWidth(index)"
          >
            −
          </button>
          <span class="min-w-[30px]"
            >{{ Math.round((width / totalWidth) * 100) }}%</span
          >
          <button
            class="hover:text-primary-600 disabled:opacity-30"
            :disabled="width >= 6"
            @click="increaseColumnWidth(index)"
          >
            +
          </button>
        </div>
      </div>
    </div>

    <!-- Grid Container -->
    <div class="flex" :style="{ gap: `${parseInt(gap) * 4}px` }">
      <template v-for="(cell, index) in cells" :key="index">
        <!-- Grid Cell -->
        <div
          :class="[
            'grid-cell min-h-[100px] border-2 border-dashed rounded-lg transition-all duration-200 p-2',
            dragOverCell === index
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-300 bg-gray-50/50',
          ]"
          :style="{ flex: columnWidths[index] || 1 }"
          @dragover.prevent.stop="handleCellDragOver(index)"
          @dragleave="handleCellDragLeave"
          @drop.stop="handleCellDrop($event, index)"
        >
          <!-- Cell label -->
          <div class="text-xs text-gray-400 mb-2">Col {{ index + 1 }}</div>

          <!-- Cell content -->
          <div
            v-if="cell.children && cell.children.length > 0"
            class="space-y-2"
          >
            <BuilderGridItem
              v-for="child in cell.children"
              :key="child.id"
              :component="child"
              :is-selected="selectedComponentId === child.id"
              @select="selectComponent(child.id)"
              @remove="removeComponentFromCell(index, child.id)"
              @edit="$emit('edit-child', child.id)"
              @update-child-prop="
                (componentId, propName, value) =>
                  handleUpdateChildProp(index, componentId, propName, value)
              "
              @edit-child="$emit('edit-child', $event)"
            />
          </div>

          <!-- Empty state -->
          <div
            v-else
            class="flex items-center justify-center h-16 text-gray-400 text-sm"
          >
            Drop here
          </div>
        </div>

        <!-- Resize Handle (between columns) -->
        <div
          v-if="index < columnWidths.length - 1"
          class="resize-handle w-2 cursor-col-resize flex items-center justify-center hover:bg-primary-100 rounded transition-colors group"
          @mousedown="startResize($event, index)"
        >
          <div
            class="w-0.5 h-8 bg-gray-300 group-hover:bg-primary-500 rounded transition-colors"
          ></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { v4 as uuidv4 } from "uuid"
  import type { ComponentInstance } from "~/composables/useBuilder"

  interface GridCell {
    children: ComponentInstance[]
  }

  interface Props {
    columns?: number
    gap?: string
    columnWidths?: number[]
    modelValue?: GridCell[]
  }

  const props = withDefaults(defineProps<Props>(), {
    columns: 2,
    gap: "4",
    columnWidths: () => [],
    modelValue: () => [],
  })

  const emit = defineEmits<{
    "update:modelValue": [value: GridCell[]]
    "update:columns": [value: number]
    "update:gap": [value: string]
    "update:columnWidths": [value: number[]]
    "edit-child": [id: string]
  }>()

  const { getComponent } = useComponentRegistry()
  const { selectedComponentId, selectComponent } = useBuilder()

  const dragOverCell = ref<number | null>(null)
  const isResizing = ref(false)
  const resizeIndex = ref<number | null>(null)
  const startX = ref(0)
  const startWidths = ref<number[]>([])

  // Layout presets
  const layoutPresets = [
    { name: "Equal 2", label: "1:1", widths: [1, 1] },
    { name: "Equal 3", label: "1:1:1", widths: [1, 1, 1] },
    { name: "Equal 4", label: "1:1:1:1", widths: [1, 1, 1, 1] },
    { name: "Sidebar Left", label: "1:3", widths: [1, 3] },
    { name: "Sidebar Right", label: "3:1", widths: [3, 1] },
    { name: "Content Center", label: "1:2:1", widths: [1, 2, 1] },
    { name: "Wide Center", label: "1:4:1", widths: [1, 4, 1] },
  ]

  // Column widths management
  const columnWidths = computed({
    get: () => {
      if (props.columnWidths && props.columnWidths.length > 0) {
        return props.columnWidths
      }
      return Array(props.columns).fill(1)
    },
    set: (value) => {
      emit("update:columnWidths", value)
      emit("update:columns", value.length)
    },
  })

  const totalWidth = computed(() =>
    columnWidths.value.reduce((a, b) => a + b, 0)
  )

  // Initialize cells based on columns
  const cells = computed({
    get: () => {
      const result: GridCell[] = []
      for (let i = 0; i < columnWidths.value.length; i++) {
        result.push(props.modelValue[i] || { children: [] })
      }
      return result
    },
    set: (value) => {
      emit("update:modelValue", value)
    },
  })

  // Check if a preset is currently active
  const isPresetActive = (widths: number[]) => {
    if (columnWidths.value.length !== widths.length) return false
    const total = widths.reduce((a, b) => a + b, 0)
    const currentTotal = totalWidth.value
    return widths.every((w, i) => {
      const expectedRatio = w / total
      const actualRatio = columnWidths.value[i] / currentTotal
      return Math.abs(expectedRatio - actualRatio) < 0.05
    })
  }

  // Apply a preset layout
  const applyPreset = (widths: number[]) => {
    columnWidths.value = [...widths]
  }

  // Add/remove columns
  const addColumn = () => {
    if (columnWidths.value.length < 6) {
      columnWidths.value = [...columnWidths.value, 1]
    }
  }

  const removeColumn = () => {
    if (columnWidths.value.length > 1) {
      columnWidths.value = columnWidths.value.slice(0, -1)
      emit("update:modelValue", cells.value.slice(0, -1))
    }
  }

  // Adjust column widths
  const increaseColumnWidth = (index: number) => {
    const newWidths = [...columnWidths.value]
    if (newWidths[index] < 6) {
      newWidths[index]++
      columnWidths.value = newWidths
    }
  }

  const decreaseColumnWidth = (index: number) => {
    const newWidths = [...columnWidths.value]
    if (newWidths[index] > 1) {
      newWidths[index]--
      columnWidths.value = newWidths
    }
  }

  // Resize by dragging
  const startResize = (event: MouseEvent, index: number) => {
    isResizing.value = true
    resizeIndex.value = index
    startX.value = event.clientX
    startWidths.value = [...columnWidths.value]

    document.addEventListener("mousemove", handleResize)
    document.addEventListener("mouseup", stopResize)
  }

  const handleResize = (event: MouseEvent) => {
    if (!isResizing.value || resizeIndex.value === null) return

    const diff = event.clientX - startX.value
    const sensitivity = 50
    const widthChange = Math.round(diff / sensitivity)

    if (widthChange !== 0) {
      const newWidths = [...startWidths.value]
      const idx = resizeIndex.value

      if (
        typeof newWidths[idx] === "number" &&
        typeof newWidths[idx + 1] === "number"
      ) {
        const newLeft = Math.max(1, Math.min(6, newWidths[idx] + widthChange))
        const rightValue =
          typeof newWidths[idx + 1] === "number" ? newWidths[idx + 1] : 1
        const safeRightValue = rightValue ?? 1
        const newRight = Math.max(1, Math.min(6, safeRightValue - widthChange))

        if (newLeft >= 1 && newRight >= 1 && newLeft <= 6 && newRight <= 6) {
          newWidths[idx] = newLeft
          newWidths[idx + 1] = newRight
          columnWidths.value = newWidths
        }
      }
    }
  }

  const stopResize = () => {
    isResizing.value = false
    resizeIndex.value = null
    document.removeEventListener("mousemove", handleResize)
    document.removeEventListener("mouseup", stopResize)
  }

  // Drag and drop handlers
  const handleCellDragOver = (index: number) => {
    dragOverCell.value = index
  }

  const handleCellDragLeave = () => {
    dragOverCell.value = null
  }

  const handleCellDrop = (event: DragEvent, cellIndex: number) => {
    dragOverCell.value = null

    const componentType = event.dataTransfer?.getData("componentType")
    if (componentType) {
      const definition = getComponent(componentType)
      if (definition) {
        const newComponent: ComponentInstance = {
          id: uuidv4(),
          type: componentType,
          props: { ...definition.defaultProps },
        }

        const newCells = [...cells.value]
        if (!newCells[cellIndex]) {
          newCells[cellIndex] = { children: [] }
        }
        newCells[cellIndex].children.push(newComponent)
        emit("update:modelValue", newCells)
      }
    }
  }

  const removeComponentFromCell = (cellIndex: number, componentId: string) => {
    const newCells = [...cells.value]
    if (newCells[cellIndex]) {
      newCells[cellIndex].children = newCells[cellIndex].children.filter(
        (c) => c.id !== componentId
      )
      emit("update:modelValue", newCells)
    }
  }

  const handleUpdateChildProp = (
    cellIndex: number,
    componentId: string,
    propName: string,
    value: any
  ) => {
    const newCells = [...cells.value]
    if (newCells[cellIndex]) {
      const component = newCells[cellIndex].children.find(
        (c) => c.id === componentId
      )
      if (component) {
        component.props[propName] = value
        emit("update:modelValue", newCells)
      }
    }
  }

  onUnmounted(() => {
    document.removeEventListener("mousemove", handleResize)
    document.removeEventListener("mouseup", stopResize)
  })
</script>

<style scoped>
  .grid-cell {
    min-height: 100px;
  }

  .resize-handle {
    flex-shrink: 0;
  }
</style>
