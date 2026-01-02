<template>
  <section
    class="py-16 px-6"
    :class="!backgroundColor ? 'bg-white' : ''"
    :style="backgroundColor ? { backgroundColor } : {}"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ title }}</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">{{ subtitle }}</p>
      </div>

      <!-- Features Grid -->
      <div
        :class="[
          'grid gap-8',
          columns === 2 ? 'grid-cols-1 md:grid-cols-2' : '',
          columns === 3 ? 'grid-cols-1 md:grid-cols-3' : '',
          columns === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : '',
        ]"
      >
        <div class="text-center p-6">
          <div
            class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-6 h-6 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">{{ feature1Title }}</h3>
          <p class="text-gray-600 text-sm">{{ feature1Desc }}</p>
        </div>

        <div class="text-center p-6">
          <div
            class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">{{ feature2Title }}</h3>
          <p class="text-gray-600 text-sm">{{ feature2Desc }}</p>
        </div>

        <div class="text-center p-6">
          <div
            class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">{{ feature3Title }}</h3>
          <p class="text-gray-600 text-sm">{{ feature3Desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  interface Props {
    title?: string
    subtitle?: string
    feature1Title?: string
    feature1Desc?: string
    feature2Title?: string
    feature2Desc?: string
    feature3Title?: string
    feature3Desc?: string
    feature4Title?: string
    feature4Desc?: string
    columns?: 2 | 3 | 4
    backgroundColor?: string
  }

  withDefaults(defineProps<Props>(), {
    title: "Our Features",
    subtitle: "Everything you need to build amazing products",
    columns: 3,
    feature1Title: "Fast Performance",
    feature1Desc: "Lightning-fast loading speeds",
    feature2Title: "Secure",
    feature2Desc: "Enterprise-grade security",
    feature3Title: "Scalable",
    feature3Desc: "Grows with your business",
    backgroundColor: "",
  })
</script>
