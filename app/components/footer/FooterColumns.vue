<template>
  <footer
    class="py-12 px-6"
    :class="!backgroundColor ? 'bg-gray-900 text-white' : ''"
    :style="backgroundColor ? { backgroundColor } : {}"
  >
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
        <!-- Company Info -->
        <div>
          <div class="text-xl font-bold mb-4">{{ companyName }}</div>
          <p class="text-gray-400 text-sm">{{ description }}</p>
        </div>

        <!-- Column 1 -->
        <div>
          <h4 class="font-semibold mb-4">{{ column1Title }}</h4>
          <ul class="space-y-2">
            <li v-for="link in parsedColumn1Links" :key="link.label">
              <a
                :href="link.url"
                class="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Column 2 -->
        <div>
          <h4 class="font-semibold mb-4">{{ column2Title }}</h4>
          <ul class="space-y-2">
            <li v-for="link in parsedColumn2Links" :key="link.label">
              <a
                :href="link.url"
                class="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Column 3 -->
        <div>
          <h4 class="font-semibold mb-4">{{ column3Title }}</h4>
          <ul class="space-y-2">
            <li v-for="link in parsedColumn3Links" :key="link.label">
              <a
                :href="link.url"
                class="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div
        class="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400"
      >
        © 2026 {{ companyName }}. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  interface Props {
    companyName?: string
    description?: string
    column1Title?: string
    column1Links?: string
    column2Title?: string
    column2Links?: string
    column3Title?: string
    column3Links?: string
    backgroundColor?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    companyName: "Company",
    description: "Building the future of web development.",
    column1Title: "Product",
    column1Links: "Features, Pricing, Docs",
    column2Title: "Company",
    column2Links: "About, Blog, Careers",
    column3Title: "Support",
    column3Links: "Help, Contact, Status",
    backgroundColor: "",
  })

  const parsedColumn1Links = computed(() =>
    props.column1Links
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
  const parsedColumn2Links = computed(() =>
    props.column2Links
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
  const parsedColumn3Links = computed(() =>
    props.column3Links
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
