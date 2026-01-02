import { v4 as uuidv4 } from "uuid"
import type { ComponentInstance } from "./useBuilder"

export interface Page {
  id: string
  name: string
  slug: string
  components: ComponentInstance[]
  createdAt: number
  updatedAt: number
}

const state = reactive({
  pages: [] as Page[],
  activePageId: null as string | null,
})

// Initialize with a default home page
if (typeof window !== "undefined") {
  const stored = localStorage.getItem("nuxt-builder-pages")
  if (stored) {
    const parsed = JSON.parse(stored)
    state.pages = parsed.pages || []
    state.activePageId = parsed.activePageId || null
  }

  // Create default home page if no pages exist
  if (state.pages.length === 0) {
    const homePage: Page = {
      id: uuidv4(),
      name: "Home",
      slug: "/",
      components: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    state.pages.push(homePage)
    state.activePageId = homePage.id
  }

  // Persist to localStorage on changes
  watch(
    () => ({ pages: state.pages, activePageId: state.activePageId }),
    (newState) => {
      localStorage.setItem("nuxt-builder-pages", JSON.stringify(newState))
    },
    { deep: true }
  )
}

export function usePages() {
  const pages = computed(() => state.pages)
  const activePageId = computed(() => state.activePageId)

  const activePage = computed(() => {
    if (!state.activePageId) return null
    return state.pages.find((p) => p.id === state.activePageId) || null
  })

  function createPage(name: string, slug: string): Page {
    const newPage: Page = {
      id: uuidv4(),
      name,
      slug: slug.startsWith("/") ? slug : `/${slug}`,
      components: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    state.pages.push(newPage)
    return newPage
  }

  function deletePage(pageId: string) {
    const index = state.pages.findIndex((p) => p.id === pageId)
    if (index === -1) return

    // Prevent deleting the last page
    if (state.pages.length === 1) {
      console.warn("Cannot delete the last page")
      return
    }

    state.pages.splice(index, 1)

    // If the deleted page was active, switch to the first page
    if (state.activePageId === pageId) {
      state.activePageId = state.pages[0]?.id || null
    }
  }

  function setActivePage(pageId: string) {
    const page = state.pages.find((p) => p.id === pageId)
    if (page) {
      state.activePageId = pageId
    }
  }

  function updatePage(pageId: string, updates: Partial<Page>) {
    const page = state.pages.find((p) => p.id === pageId)
    if (page) {
      Object.assign(page, { ...updates, updatedAt: Date.now() })
    }
  }

  function updatePageComponents(
    pageId: string,
    components: ComponentInstance[]
  ) {
    const page = state.pages.find((p) => p.id === pageId)
    if (page) {
      page.components = components
      page.updatedAt = Date.now()
    }
  }

  function getPageBySlug(slug: string): Page | null {
    return state.pages.find((p) => p.slug === slug) || null
  }

  function exportAllPages(): string {
    const exportData = {
      pages: state.pages,
      activePageId: state.activePageId,
      exportedAt: Date.now(),
      version: "1.0",
    }
    return JSON.stringify(exportData, null, 2)
  }

  function importAllPages(json: string): boolean {
    try {
      const parsed = JSON.parse(json)

      // Validate the structure
      if (!parsed.pages || !Array.isArray(parsed.pages)) {
        return false
      }

      // Replace all pages with imported data
      state.pages = parsed.pages

      // Set active page (use imported activePageId or fallback to first page)
      if (
        parsed.activePageId &&
        state.pages.find((p) => p.id === parsed.activePageId)
      ) {
        state.activePageId = parsed.activePageId
      } else {
        state.activePageId = state.pages[0]?.id || null
      }

      return true
    } catch (error) {
      console.error("Failed to import pages:", error)
      return false
    }
  }

  return {
    pages,
    activePageId,
    activePage,
    createPage,
    deletePage,
    setActivePage,
    updatePage,
    updatePageComponents,
    getPageBySlug,
    exportAllPages,
    importAllPages,
  }
}
