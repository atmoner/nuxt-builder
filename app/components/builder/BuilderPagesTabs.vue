<template>
  <div class="border-b border-gray-200 bg-white">
    <!-- Pages Tabs -->
    <div class="flex items-center px-4 pt-2 gap-2 overflow-x-auto">
      <!-- Page Tabs -->
      <button
        v-for="page in pages"
        :key="page.id"
        :class="[
          'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap',
          activePageId === page.id
            ? 'bg-gray-100 text-gray-900 border-t-2 border-l border-r '
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
        ]"
        @click="setActivePage(page.id)"
      >
        <span>{{ page.name }}</span>
        <button
          v-if="pages.length > 1"
          class="ml-1 hover:text-red-600 transition-colors"
          @click.stop="confirmDelete(page.id)"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </button>

      <!-- New Page Button -->
      <button
        class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-t-lg transition-colors whitespace-nowrap"
        @click="showNewPageModal = true"
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
        New Page
      </button>
    </div>

    <!-- New Page Modal -->
    <div
      v-if="showNewPageModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="showNewPageModal = false"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          Create New Page
        </h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Page Name
            </label>
            <input
              v-model="newPageName"
              type="text"
              placeholder="About Us"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              @keyup.enter="handleCreatePage"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Page Slug
            </label>
            <input
              v-model="newPageSlug"
              type="text"
              placeholder="/about"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              @keyup.enter="handleCreatePage"
            />
            <p class="text-xs text-gray-500 mt-1">
              URL path for this page (e.g., /about, /contact)
            </p>
          </div>
        </div>
        <div class="flex justify-end gap-3 mt-6">
          <button
            class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            @click="showNewPageModal = false"
          >
            Cancel
          </button>
          <button
            class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!newPageName || !newPageSlug"
            @click="handleCreatePage"
          >
            Create Page
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { usePages } from "~/composables/usePages"

  const { pages, activePageId, createPage, deletePage, setActivePage } =
    usePages()

  const showNewPageModal = ref(false)
  const newPageName = ref("")
  const newPageSlug = ref("")

  function handleCreatePage() {
    if (newPageName.value && newPageSlug.value) {
      const page = createPage(newPageName.value, newPageSlug.value)
      setActivePage(page.id)
      showNewPageModal.value = false
      newPageName.value = ""
      newPageSlug.value = ""
    }
  }

  function confirmDelete(pageId: string) {
    if (confirm("Are you sure you want to delete this page?")) {
      deletePage(pageId)
    }
  }

  // Auto-generate slug from name
  watch(newPageName, (name) => {
    if (name) {
      newPageSlug.value = "/" + name.toLowerCase().replace(/\s+/g, "-")
    }
  })
</script>
