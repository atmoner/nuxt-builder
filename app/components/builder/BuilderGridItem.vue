<template>
  <div
    :class="[
      'relative p-3 bg-white border rounded-lg transition-all duration-200 group',
      isSelected
        ? 'ring-2 ring-primary-500 border-primary-400'
        : 'border-gray-200 hover:border-primary-300',
    ]"
    @click.stop="$emit('select')"
  >
    <!-- Actions -->
    <div
      class="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <button
        class="p-1 text-gray-400 hover:text-primary-600 bg-white rounded shadow-sm"
        title="Edit"
        @click.stop="$emit('edit')"
      >
        <svg
          class="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </button>
      <button
        class="p-1 text-gray-400 hover:text-red-600 bg-white rounded shadow-sm"
        title="Remove"
        @click.stop="$emit('remove')"
      >
        <svg
          class="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>

    <!-- Component render -->
    <div class="pt-1">
      <UiButton v-if="component.type === 'UiButton'" v-bind="component.props" />
      <UiBadge
        v-else-if="component.type === 'UiBadge'"
        v-bind="component.props"
      />
      <UiCard
        v-else-if="component.type === 'UiCard'"
        v-bind="component.props"
      />
      <UiInput
        v-else-if="component.type === 'UiInput'"
        v-bind="component.props"
      />
      <UiSelect
        v-else-if="component.type === 'UiSelect'"
        v-bind="component.props"
      />
      <UiModal
        v-else-if="component.type === 'UiModal'"
        v-bind="component.props"
      />
      <UiAlert
        v-else-if="component.type === 'UiAlert'"
        v-bind="component.props"
      />
      <UiProgress
        v-else-if="component.type === 'UiProgress'"
        v-bind="component.props"
      />
      <UiTabs
        v-else-if="component.type === 'UiTabs'"
        v-bind="component.props"
      />
      <UiAccordion
        v-else-if="component.type === 'UiAccordion'"
        v-bind="component.props"
      />
      <UiTooltip
        v-else-if="component.type === 'UiTooltip'"
        v-bind="component.props"
      />
      <UiCheckbox
        v-else-if="component.type === 'UiCheckbox'"
        v-bind="component.props"
      />
      <UiDivider
        v-else-if="component.type === 'UiDivider'"
        v-bind="component.props"
      />
      <UiGrid
        v-else-if="component.type === 'UiGrid'"
        :columns="component.props.columns"
        :gap="component.props.gap"
        :column-widths="component.props.columnWidths"
        :model-value="component.props.cells"
        @update:model-value="
          (val) => $emit('update-child-prop', component.id, 'cells', val)
        "
        @update:columns="
          (val) => $emit('update-child-prop', component.id, 'columns', val)
        "
        @update:gap="
          (val) => $emit('update-child-prop', component.id, 'gap', val)
        "
        @update:column-widths="
          (val) => $emit('update-child-prop', component.id, 'columnWidths', val)
        "
        @edit-child="(id) => $emit('edit-child', id)"
      />
      <UiTable
        v-else-if="component.type === 'UiTable'"
        v-bind="component.props"
      />
      <UiDropdown
        v-else-if="component.type === 'UiDropdown'"
        v-bind="component.props"
      />
      <div v-else class="text-gray-400 text-xs">{{ component.type }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { ComponentInstance } from "~/composables/useBuilder"

  interface Props {
    component: ComponentInstance
    isSelected: boolean
  }

  defineProps<Props>()

  defineEmits<{
    select: []
    remove: []
    edit: []
    "update-child-prop": [componentId: string, propName: string, value: any]
    "edit-child": [id: string]
  }>()
</script>
