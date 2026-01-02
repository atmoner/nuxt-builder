<template>
  <section
    class="relative py-32 px-6"
    :class="!backgroundColor ? 'bg-gray-900' : ''"
    :style="backgroundColor ? { backgroundColor } : {}"
  >
    <!-- Background Image Placeholder -->
    <div
      :class="
        !backgroundColor
          ? 'absolute inset-0 bg-gradient-to-br from-primary-900 to-gray-900'
          : 'hidden'
      "
    >
      <div
        :class="[
          'absolute inset-0',
          overlayOpacity === '30' ? 'bg-black/30' : '',
          overlayOpacity === '50' ? 'bg-black/50' : '',
          overlayOpacity === '70' ? 'bg-black/70' : '',
        ]"
      />
    </div>

    <!-- Content -->
    <div class="relative max-w-4xl mx-auto text-center text-white">
      <h1 class="text-4xl md:text-6xl font-bold mb-6">
        {{ title }}
      </h1>
      <p class="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto">
        {{ subtitle }}
      </p>
      <a
        :href="buttonUrl"
        class="inline-block px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
      >
        {{ buttonText }}
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
  interface Props {
    title?: string
    subtitle?: string
    buttonText?: string
    buttonUrl?: string
    overlayOpacity?: "30" | "50" | "70"
    backgroundColor?: string
  }

  withDefaults(defineProps<Props>(), {
    title: "Transform Your Ideas",
    subtitle: "Bring your vision to life with our powerful platform",
    buttonText: "Explore Now",
    buttonUrl: "#",
    overlayOpacity: "50",
    backgroundColor: "",
  })
</script>
