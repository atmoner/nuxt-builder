<template>
  <!-- UI Components -->
  <UiButton v-if="component.type === 'UiButton'" v-bind="component.props" />
  <UiBadge v-else-if="component.type === 'UiBadge'" v-bind="component.props" />
  <UiCard v-else-if="component.type === 'UiCard'" v-bind="component.props" />
  <UiInput v-else-if="component.type === 'UiInput'" v-bind="component.props" />
  <UiSelect
    v-else-if="component.type === 'UiSelect'"
    v-bind="component.props"
  />
  <UiModal v-else-if="component.type === 'UiModal'" v-bind="component.props" />
  <UiAlert v-else-if="component.type === 'UiAlert'" v-bind="component.props" />
  <UiProgress
    v-else-if="component.type === 'UiProgress'"
    v-bind="component.props"
  />
  <UiTabs v-else-if="component.type === 'UiTabs'" v-bind="component.props" />
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
  <UiTable v-else-if="component.type === 'UiTable'" v-bind="component.props" />
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

  <!-- UiGrid -->
  <div v-else-if="component.type === 'UiGrid'" class="w-full">
    <div
      class="flex"
      :style="{ gap: `${parseInt(component.props.gap || '4') * 4}px` }"
    >
      <div
        v-for="(cell, index) in gridCells"
        :key="index"
        :style="{ flex: component.props.columnWidths?.[index] || 1 }"
      >
        <div v-if="cell.children && cell.children.length > 0" class="space-y-4">
          <PreviewComponent
            v-for="child in cell.children"
            :key="child.id"
            :component="child"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Unknown -->
  <div v-else class="p-4 bg-gray-100 rounded text-gray-500 text-sm">
    Unknown component: {{ component.type }}
  </div>
</template>

<script setup lang="ts">
  import type { ComponentInstance } from "~/composables/useBuilder"

  interface Props {
    component: ComponentInstance
  }

  const props = defineProps<Props>()

  const gridCells = computed(() => {
    if (props.component.type !== "UiGrid") return []
    const cells = props.component.props.cells || []
    const columns = props.component.props.columns || 2
    const result = []
    for (let i = 0; i < columns; i++) {
      result.push(cells[i] || { children: [] })
    }
    return result
  })
</script>
