<template>
  <section class="py-16 px-4" :style="bgStyle">
    <div class="container mx-auto max-w-6xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {{ title }}
        </h2>
        <p class="text-lg text-gray-600">
          {{ subtitle }}
        </p>
      </div>

      <!-- Logos Grid -->
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
      >
        <div
          v-for="(logo, index) in logoList"
          :key="index"
          class="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
        >
          <img
            :src="logo.url"
            :alt="logo.name"
            class="max-h-12 w-auto object-contain"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const props = defineProps<{
    title?: string
    subtitle?: string
    logos?: string | Array<{ name: string; url: string }>
    backgroundColor?: string
  }>()

  const logoList = computed(() => {
    if (!props.logos) return []
    if (typeof props.logos === "string") {
      try {
        return JSON.parse(props.logos)
      } catch {
        return []
      }
    }
    return props.logos
  })

  const bgStyle = computed(() => {
    if (props.backgroundColor) {
      return { backgroundColor: props.backgroundColor }
    }
    return {}
  })
</script>
