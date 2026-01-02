<template>
  <section
    class="py-20 px-6"
    :class="!backgroundColor ? 'bg-white' : ''"
    :style="backgroundColor ? { backgroundColor } : {}"
  >
    <div
      :class="[
        'max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12',
        imagePosition === 'left' ? 'md:flex-row-reverse' : '',
      ]"
    >
      <!-- Content -->
      <div class="flex-1">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {{ title }}
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          {{ subtitle }}
        </p>
        <div class="flex flex-wrap gap-4">
          <a
            :href="buttonUrl"
            class="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            {{ buttonText }}
          </a>
          <a
            :href="secondaryButtonUrl"
            class="inline-block px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            {{ secondaryButtonText }}
          </a>
        </div>
      </div>

      <!-- Image -->
      <div class="flex-1">
        <div
          class="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center overflow-hidden"
        >
          <img
            v-if="props.imageUrl"
            :src="props.imageUrl"
            :alt="props.title"
            class="w-full h-full object-cover"
          />
          <svg
            v-else
            class="w-24 h-24 text-primary-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  interface Props {
    title?: string
    subtitle?: string
    buttonText?: string
    buttonUrl?: string
    secondaryButtonText?: string
    secondaryButtonUrl?: string
    imagePosition?: "left" | "right"
    imageUrl?: string
    backgroundColor?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    title: "Modern Design Solutions",
    subtitle:
      "Create stunning websites with our drag-and-drop builder. No coding required.",
    buttonText: "Start Building",
    buttonUrl: "#",
    secondaryButtonText: "Learn More",
    secondaryButtonUrl: "#",
    imagePosition: "right",
    imageUrl: "",
    backgroundColor: "",
  })
</script>
