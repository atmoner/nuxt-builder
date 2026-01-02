<template>
  <div class="h-screen flex flex-col">
    <!-- Header -->
    <header
      class="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between"
    >
      <div class="flex items-center gap-3">
        <h1 class="text-xl font-bold text-gray-900">🔧 Nuxt Builder</h1>
        <span
          class="px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-800 rounded-full"
        >
          v1.0
        </span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm text-gray-500"
          >{{ activePage?.name || "No page" }}:
          {{ components.length }} components</span
        >
        <NuxtLink
          to="/preview"
          class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
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
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          Preview
        </NuxtLink>
      </div>
    </header>

    <!-- Pages Tabs -->
    <BuilderPagesTabs />

    <!-- Main Content -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Left Sidebar - Components -->
      <BuilderSidebar
        @export="handleExport"
        @import="handleImport"
        @clear="handleClear"
      />

      <!-- Center - Canvas -->
      <BuilderCanvas @edit="openPropsEditor" />

      <!-- Right Sidebar - Props Editor -->
      <BuilderPropsEditor
        :component="selectedComponent"
        :is-open="isPropsEditorOpen"
        @close="closePropsEditor"
      />
    </div>

    <!-- Import Modal -->
    <Teleport to="body">
      <div
        v-if="showImportModal"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          class="fixed inset-0 bg-black bg-opacity-50"
          @click="showImportModal = false"
        />
        <div
          class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 p-6"
        >
          <h3 class="text-lg font-semibold mb-2">Import All Pages</h3>
          <p class="text-sm text-gray-600 mb-4">
            ⚠️ This will replace all your current pages with the imported data.
          </p>
          <textarea
            v-model="importJson"
            class="w-full h-64 p-3 border border-gray-300 rounded-md font-mono text-sm"
            placeholder="Paste your exported pages JSON here..."
          />
          <div class="flex justify-end gap-3 mt-4">
            <button
              class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              @click="showImportModal = false"
            >
              Cancel
            </button>
            <button
              class="px-4 py-2 text-white bg-primary-600 rounded-md hover:bg-primary-700"
              @click="confirmImport"
            >
              Import
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Export Modal -->
    <Teleport to="body">
      <div
        v-if="showExportModal"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          class="fixed inset-0 bg-black bg-opacity-50"
          @click="showExportModal = false"
        />
        <div
          class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 p-6"
        >
          <h3 class="text-lg font-semibold mb-2">Export All Pages</h3>
          <p class="text-sm text-gray-600 mb-4">
            This will export all your pages with their components.
          </p>
          <textarea
            :value="exportedJson"
            readonly
            class="w-full h-64 p-3 border border-gray-300 rounded-md font-mono text-sm bg-gray-50"
          />
          <div class="flex justify-end gap-3 mt-4">
            <button
              class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              @click="showExportModal = false"
            >
              Close
            </button>
            <button
              class="px-4 py-2 text-white bg-primary-600 rounded-md hover:bg-primary-700"
              @click="copyToClipboard"
            >
              Copy to Clipboard
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
  import { usePages } from "~/composables/usePages"

  const {
    components,
    selectedComponent,
    selectComponent,
    exportLayout,
    importLayout,
    clearAll,
  } = useBuilder()

  const { activePage } = usePages()

  const isPropsEditorOpen = ref(false)
  const showImportModal = ref(false)
  const showExportModal = ref(false)
  const importJson = ref("")
  const exportedJson = ref("")

  const openPropsEditor = (id: string) => {
    selectComponent(id)
    isPropsEditorOpen.value = true
  }

  const closePropsEditor = () => {
    isPropsEditorOpen.value = false
  }

  const handleExport = () => {
    exportedJson.value = exportLayout()
    showExportModal.value = true
  }

  const handleImport = () => {
    importJson.value = ""
    showImportModal.value = true
  }

  const confirmImport = () => {
    if (importLayout(importJson.value)) {
      showImportModal.value = false
      alert("✅ All pages imported successfully!")
    } else {
      alert("❌ Invalid JSON format. Please check your data.")
    }
  }

  const handleClear = () => {
    if (confirm("Are you sure you want to clear all components?")) {
      clearAll()
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(exportedJson.value)
      alert("✅ Copied to clipboard!")
    } catch {
      alert("Failed to copy")
    }
  }
</script>
