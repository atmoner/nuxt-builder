<template>
  <div
    :class="['placed-component', isSelected ? 'ring-2 ring-primary-500' : '']"
    @click.stop="$emit('select')"
  >
    <!-- Component Label -->
    <div
      class="top-2 left-2 px-2 py-0.5 text-xs font-medium text-gray-500 bg-gray-100 rounded"
    >
      {{ componentDef?.name || component.type }}
    </div>
    <!-- Component Actions -->
    <div class="component-actions">
      <button
        class="p-1 text-gray-400 hover:text-gray-600 bg-white rounded shadow-sm"
        title="Move up"
        @click.stop="$emit('move-up')"
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
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
      <button
        class="p-1 text-gray-400 hover:text-gray-600 bg-white rounded shadow-sm"
        title="Move down"
        @click.stop="$emit('move-down')"
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
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <button
        class="p-1 text-gray-400 hover:text-primary-600 bg-white rounded shadow-sm"
        title="Edit properties"
        @click.stop="$emit('edit')"
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
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </button>
      <button
        class="p-1 text-gray-400 hover:text-primary-600 bg-white rounded shadow-sm"
        title="Duplicate"
        @click.stop="$emit('duplicate')"
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
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </button>
      <button
        class="p-1 text-gray-400 hover:text-red-600 bg-white rounded shadow-sm"
        title="Remove"
        @click.stop="$emit('remove')"
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
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>

    <!-- Rendered Component -->
    <div class="pt-4">
      <!-- UI Components -->
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
      <UiTable
        v-else-if="component.type === 'UiTable'"
        v-bind="component.props"
      />
      <UiDropdown
        v-else-if="component.type === 'UiDropdown'"
        v-bind="component.props"
      />
      <!-- Hero Components -->
      <HeroSimple
        v-else-if="component.type === 'HeroSimple'"
        v-bind="component.props"
      />
      <HeroSplit
        v-else-if="component.type === 'HeroSplit'"
        v-bind="component.props"
      />
      <HeroWithImage
        v-else-if="component.type === 'HeroWithImage'"
        v-bind="component.props"
      />
      <!-- Header Components -->
      <HeaderSimple
        v-else-if="component.type === 'HeaderSimple'"
        v-bind="component.props"
      />
      <HeaderCentered
        v-else-if="component.type === 'HeaderCentered'"
        v-bind="component.props"
      />
      <HeaderMega
        v-else-if="component.type === 'HeaderMega'"
        v-bind="component.props"
      />
      <!-- Footer Components -->
      <FooterSimple
        v-else-if="component.type === 'FooterSimple'"
        v-bind="component.props"
      />
      <FooterColumns
        v-else-if="component.type === 'FooterColumns'"
        v-bind="component.props"
      />
      <FooterNewsletter
        v-else-if="component.type === 'FooterNewsletter'"
        v-bind="component.props"
      />
      <!-- Content Components -->
      <ContentFeatures
        v-else-if="component.type === 'ContentFeatures'"
        v-bind="component.props"
      />
      <ContentTestimonials
        v-else-if="component.type === 'ContentTestimonials'"
        v-bind="component.props"
      />
      <ContentPricing
        v-else-if="component.type === 'ContentPricing'"
        v-bind="component.props"
      />
      <ContentCTA
        v-else-if="component.type === 'ContentCTA'"
        v-bind="component.props"
      />
      <ContentStats
        v-else-if="component.type === 'ContentStats'"
        v-bind="component.props"
      />
      <ContentTeam
        v-else-if="component.type === 'ContentTeam'"
        v-bind="component.props"
      />
      <ContentBlog
        v-else-if="component.type === 'ContentBlog'"
        v-bind="component.props"
      />
      <ContentFAQ
        v-else-if="component.type === 'ContentFAQ'"
        v-bind="component.props"
      />
      <ContentGallery
        v-else-if="component.type === 'ContentGallery'"
        v-bind="component.props"
      />
      <ContentTimeline
        v-else-if="component.type === 'ContentTimeline'"
        v-bind="component.props"
      />
      <ContentLogos
        v-else-if="component.type === 'ContentLogos'"
        v-bind="component.props"
      />
      <!-- UI Components -->
      <UiButton
        v-else-if="component.type === 'UiButton'"
        v-bind="component.props"
      />
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
      <UiModal
        v-else-if="component.type === 'UiModal'"
        v-bind="component.props"
      />
      <UiCheckbox
        v-else-if="component.type === 'UiCheckbox'"
        v-bind="component.props"
      />
      <UiSelect
        v-else-if="component.type === 'UiSelect'"
        v-bind="component.props"
      />
      <UiDivider
        v-else-if="component.type === 'UiDivider'"
        v-bind="component.props"
      />
      <!-- Layout Components -->
      <UiGrid
        v-else-if="component.type === 'UiGrid'"
        :columns="component.props.columns"
        :gap="component.props.gap"
        :column-widths="component.props.columnWidths"
        :model-value="component.props.cells"
        @update:model-value="updateGridCells"
        @update:columns="
          (val) => updateComponent(component.id, { columns: val })
        "
        @update:gap="(val) => updateComponent(component.id, { gap: val })"
        @update:column-widths="
          (val) => updateComponent(component.id, { columnWidths: val })
        "
        @edit-child="handleEditChild"
      />
      <div v-else class="text-gray-400 text-sm">
        Unknown component: {{ component.type }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { ComponentInstance } from "~/composables/useBuilder"

  interface Props {
    component: ComponentInstance
    index: number
    isSelected: boolean
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    select: []
    remove: []
    duplicate: []
    edit: []
    "move-up": []
    "move-down": []
    "edit-child": [id: string]
  }>()

  const { getComponent } = useComponentRegistry()
  const { updateComponent } = useBuilder()

  const componentDef = computed(() => getComponent(props.component.type))

  const updateGridCells = (cells: any[]) => {
    updateComponent(props.component.id, { cells })
  }

  const handleEditChild = (childId: string) => {
    emit("edit-child", childId)
  }
</script>
