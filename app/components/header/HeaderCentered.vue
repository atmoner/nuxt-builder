<template>
  <header
    :class="[
      'px-6 py-4 border-b',
      theme === 'light'
        ? 'bg-white border-gray-200'
        : 'bg-gray-900 border-gray-800',
    ]"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Top row with logo and search -->
      <div class="flex items-center justify-between mb-4">
        <div
          :class="[
            'text-2xl font-bold',
            theme === 'light' ? 'text-gray-900' : 'text-white',
          ]"
        >
          {{ logo }}
        </div>

        <div v-if="showSearch" class="flex-1 max-w-md mx-8">
          <div class="relative">
            <input
              type="text"
              placeholder="Search..."
              :class="[
                'w-full px-4 py-2 pl-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500',
                theme === 'light'
                  ? 'bg-gray-50 border-gray-200'
                  : 'bg-gray-800 border-gray-700 text-white',
              ]"
            />
            <svg
              class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <button
            :class="[
              'p-2 rounded-lg',
              theme === 'light'
                ? 'hover:bg-gray-100 text-gray-600'
                : 'hover:bg-gray-800 text-gray-300',
            ]"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Navigation centered -->
      <nav class="flex items-center justify-center gap-8">
        <a
          v-for="link in parsedLinks"
          :key="link.label"
          :href="link.url"
          :class="[
            'font-medium transition-colors',
            theme === 'light'
              ? 'text-gray-600 hover:text-gray-900'
              : 'text-gray-300 hover:text-white',
          ]"
        >
          {{ link.label }}
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
  interface Props {
    logo?: string
    links?: string
    showSearch?: boolean
    theme?: "light" | "dark"
    backgroundColor?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    logo: "LOGO",
    links: "Products, Solutions, Pricing, About",
    showSearch: true,
    theme: "light",
  })

  const parsedLinks = computed(() =>
    props.links
      .split(",")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((item) => {
        const parts = item.split("|")
        return {
          label: parts[0]?.trim() || "",
          url: parts[1]?.trim() || "#",
        }
      })
  )
</script>
