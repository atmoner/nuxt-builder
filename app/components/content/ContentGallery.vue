<template>
  <section class="py-16 px-4" :style="bgStyle">
    <div class="container mx-auto max-w-7xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {{ title }}
        </h2>
        <p class="text-lg text-gray-600">
          {{ subtitle }}
        </p>
      </div>

      <!-- Gallery Grid -->
      <div
        class="grid gap-4"
        :class="[
          gapClass,
          {
            'md:grid-cols-2': columns === 2,
            'md:grid-cols-3': columns === 3,
            'md:grid-cols-4': columns === 4,
          },
        ]"
      >
        <div
          v-for="(image, index) in imageList"
          :key="index"
          class="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
        >
          <img
            :src="image.url"
            :alt="image.caption"
            class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div
            class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center"
          >
            <p
              class="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              {{ image.caption }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const props = defineProps<{
    title?: string
    subtitle?: string
    images?: string | Array<{ url: string; caption: string }>
    columns?: number
    gap?: "sm" | "md" | "lg"
    backgroundColor?: string
  }>()

  const imageList = computed(() => {
    if (!props.images) return []
    if (typeof props.images === "string") {
      try {
        return JSON.parse(props.images)
      } catch {
        return []
      }
    }
    return props.images
  })

  const gapClass = computed(() => {
    const gaps = {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-8",
    }
    return gaps[props.gap || "md"]
  })

  const bgStyle = computed(() => {
    if (props.backgroundColor) {
      return { backgroundColor: props.backgroundColor }
    }
    return {}
  })
</script>
