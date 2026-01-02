<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Preview Header -->
    <header
      class="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10"
    >
      <div class="flex items-center gap-3">
        <h1 class="text-lg font-semibold text-gray-900">👁️ Preview Mode</h1>
        <div class="flex items-center gap-2">
          <select
            v-model="selectedPageId"
            class="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option v-for="page in pages" :key="page.id" :value="page.id">
              {{ page.name }} ({{ page.slug }})
            </option>
          </select>
          <span class="text-xs text-gray-400 font-mono">
            {{ currentPage?.slug }}
          </span>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-500"
          >{{ currentPageComponents.length }} components</span
        >
        <span class="text-xs text-gray-400">|</span>
        <span class="text-xs text-gray-500">
          {{ pages.length }} page{{ pages.length > 1 ? 's' : '' }}
        </span>
        <NuxtLink
          to="/"
          class="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors"
        >
          ← Back to Builder
        </NuxtLink>
      </div>
    </header>

    <!-- Preview Content 
     <main class="max-w-7xl mx-auto p-6">
      -->
    <main class="mx-auto p-6" @click="handleLinkClick">
      <div
        v-if="currentPageComponents.length === 0"
        class="text-center py-20 text-gray-500"
      >
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
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <p class="text-lg font-medium">No components on this page</p>
        <p class="text-sm mt-1">Go back to the builder to add components</p>
      </div>

      <div v-else class="space-y-6">
        <PreviewComponent
          v-for="component in currentPageComponents"
          :key="component.id"
          :component="component"
        />
      </div>
    </main>

    <!-- Notification Toast -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-2 opacity-0"
    >
      <div
        v-if="notification"
        :class="[
          'fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg text-white font-medium z-50',
          notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        ]"
      >
        {{ notification.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import { usePages } from "~/composables/usePages"

  const { pages, activePageId, setActivePage, getPageBySlug } = usePages()
  
  const selectedPageId = ref(activePageId.value)
  const notification = ref<{ message: string; type: 'success' | 'error' } | null>(null)

  // Get current page
  const currentPage = computed(() => {
    return pages.value.find(p => p.id === selectedPageId.value)
  })

  // Get components from selected page
  const currentPageComponents = computed(() => {
    return currentPage.value?.components || []
  })

  // Watch for page selection changes
  watch(selectedPageId, (newPageId) => {
    if (newPageId) {
      setActivePage(newPageId)
    }
  })

  // Initialize with active page
  if (!selectedPageId.value && pages.value.length > 0) {
    const firstPage = pages.value[0]
    if (firstPage) {
      selectedPageId.value = firstPage.id
    }
  }

  // Show notification
  function showNotification(message: string, type: 'success' | 'error' = 'success') {
    notification.value = { message, type }
    setTimeout(() => {
      notification.value = null
    }, 3000)
  }

  // Handle link clicks to navigate between pages
  function handleLinkClick(event: MouseEvent) {
    const target = event.target as HTMLElement
    const link = target.closest('a')
    
    if (link && link.href) {
      const url = new URL(link.href)
      const path = url.pathname
      
      // Check if it's an internal link (not external)
      if (url.origin === window.location.origin) {
        // Find page by slug
        const page = getPageBySlug(path)
        
        if (page) {
          event.preventDefault()
          selectedPageId.value = page.id
          showNotification(`Navigated to: ${page.name}`)
          
          // Scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else if (path !== '/' && !path.startsWith('/preview')) {
          event.preventDefault()
          showNotification(`Page not found: ${path}`, 'error')
        }
      }
    }
  }
</script>

<style scoped>
  /* Style for internal links in preview mode */
  :deep(a[href^="/"]:not([href^="//"])) {
    cursor: pointer;
    transition: opacity 0.2s;
    position: relative;
  }
  
  :deep(a[href^="/"]:not([href^="//"])):hover {
    opacity: 0.8;
  }

  /* Add subtle underline for internal links */
  :deep(a[href^="/"]:not([href^="//"])):not(.bg-primary-600):not(.bg-green-600):hover {
    text-decoration: underline;
    text-decoration-style: dashed;
  }
</style>
