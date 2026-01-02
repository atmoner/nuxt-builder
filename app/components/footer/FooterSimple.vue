<template>
  <footer
    :class="[
      'py-8 px-6',
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900',
    ]"
  >
    <div
      class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"
    >
      <div
        :class="[
          'text-sm',
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
        ]"
      >
        © {{ year }} {{ companyName }}. All rights reserved.
      </div>

      <nav class="flex items-center gap-6">
        <a
          v-for="link in parsedLinks"
          :key="link.label"
          :href="link.url"
          :class="[
            'text-sm transition-colors',
            theme === 'dark'
              ? 'text-gray-400 hover:text-white'
              : 'text-gray-600 hover:text-gray-900',
          ]"
        >
          {{ link.label }}
        </a>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
  interface Props {
    companyName?: string
    year?: string
    links?: string
    theme?: "light" | "dark"
    backgroundColor?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    companyName: "MyCompany",
    year: "2026",
    links: "Privacy, Terms, Contact",
    theme: "dark",
    backgroundColor: "",
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
