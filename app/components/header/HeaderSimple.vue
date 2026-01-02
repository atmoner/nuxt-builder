<template>
  <header
    :class="[
      'border-b',
      !backgroundColor ? 'bg-white border-gray-200' : '',
      sticky ? 'sticky top-0 z-50' : '',
    ]"
    :style="backgroundColor ? { backgroundColor } : {}"
  >
    <div class="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
      <!-- Logo -->
      <div class="text-xl font-bold text-gray-900">
        {{ logo }}
      </div>

      <!-- Navigation -->
      <nav class="hidden md:flex items-center gap-8">
        <a
          v-for="link in parsedLinks"
          :key="link.label"
          :href="link.url"
          class="text-gray-600 hover:text-gray-900 transition-colors"
        >
          {{ link.label }}
        </a>
      </nav>

      <!-- CTA Button -->
      <a
        :href="buttonUrl"
        class="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
      >
        {{ buttonText }}
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
  interface Props {
    logo?: string
    links?: string
    buttonText?: string
    buttonUrl?: string
    sticky?: boolean
    backgroundColor?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    logo: "MyBrand",
    links: "Home, About, Services, Contact",
    buttonText: "Sign Up",
    sticky: false,
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
