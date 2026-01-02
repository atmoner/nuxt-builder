<template>
  <section class="py-16 px-4" :style="bgStyle">
    <div class="container mx-auto max-w-7xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {{ title }}
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {{ subtitle }}
        </p>
      </div>

      <!-- Grid Layout -->
      <div
        v-if="layout === 'grid'"
        class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <article
          v-for="(post, index) in postList"
          :key="index"
          class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <img
            :src="post.image"
            :alt="post.title"
            class="w-full h-48 object-cover"
          />
          <div class="p-6">
            <div class="flex items-center gap-2 mb-3">
              <span
                class="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded"
              >
                {{ post.category }}
              </span>
              <span class="text-sm text-gray-500">{{ post.date }}</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              {{ post.title }}
            </h3>
            <p class="text-gray-600 mb-4">{{ post.excerpt }}</p>
            <div class="flex items-center text-sm text-gray-500">
              <span>By {{ post.author }}</span>
            </div>
          </div>
        </article>
      </div>

      <!-- List Layout -->
      <div v-else class="space-y-8 max-w-4xl mx-auto">
        <article
          v-for="(post, index) in postList"
          :key="index"
          class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col md:flex-row"
        >
          <img
            :src="post.image"
            :alt="post.title"
            class="w-full md:w-64 h-48 object-cover"
          />
          <div class="p-6 flex-1">
            <div class="flex items-center gap-2 mb-3">
              <span
                class="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded"
              >
                {{ post.category }}
              </span>
              <span class="text-sm text-gray-500">{{ post.date }}</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              {{ post.title }}
            </h3>
            <p class="text-gray-600 mb-4">{{ post.excerpt }}</p>
            <div class="text-sm text-gray-500">By {{ post.author }}</div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const props = defineProps<{
    title?: string
    subtitle?: string
    posts?:
      | string
      | Array<{
          title: string
          excerpt: string
          image: string
          date: string
          author: string
          category: string
        }>
    layout?: "grid" | "list"
    backgroundColor?: string
  }>()

  const postList = computed(() => {
    if (!props.posts) return []
    if (typeof props.posts === "string") {
      try {
        return JSON.parse(props.posts)
      } catch {
        return []
      }
    }
    return props.posts
  })

  const bgStyle = computed(() => {
    if (props.backgroundColor) {
      return { backgroundColor: props.backgroundColor }
    }
    return {}
  })
</script>
