<template>
  <section
    class="py-16 px-6"
    :class="!backgroundColor ? 'bg-gray-50' : ''"
    :style="backgroundColor ? { backgroundColor } : {}"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <h2 class="text-3xl font-bold text-gray-900 text-center mb-12">
        {{ title }}
      </h2>

      <!-- Testimonials -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white p-8 rounded-2xl shadow-sm">
          <svg
            class="w-10 h-10 text-primary-200 mb-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
            />
          </svg>
          <p class="text-gray-700 text-lg mb-6">{{ testimonial1Text }}</p>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div>
              <div class="font-semibold text-gray-900">
                {{ testimonial1Author }}
              </div>
              <div class="text-sm text-gray-500">{{ testimonial1Role }}</div>
            </div>
          </div>
        </div>

        <div class="bg-white p-8 rounded-2xl shadow-sm">
          <svg
            class="w-10 h-10 text-primary-200 mb-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
            />
          </svg>
          <p class="text-gray-700 text-lg mb-6">{{ testimonial2Text }}</p>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div>
              <div class="font-semibold text-gray-900">
                {{ testimonial2Author }}
              </div>
              <div class="text-sm text-gray-500">{{ testimonial2Role }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  interface Props {
    title?: string
    subtitle?: string
    testimonial1Text?: string
    testimonial1Author?: string
    testimonial1Role?: string
    testimonial2Text?: string
    testimonial2Author?: string
    testimonial2Role?: string
    backgroundColor?: string
  }

  withDefaults(defineProps<Props>(), {
    title: "What Our Customers Say",
    testimonial1Text:
      "This product changed our business completely. Highly recommended!",
    testimonial1Author: "John Doe",
    testimonial1Role: "CEO at TechCorp",
    testimonial2Text:
      "Amazing experience from start to finish. The team is fantastic!",
    testimonial2Author: "Jane Smith",
    testimonial2Role: "Designer at Creative Co",
    backgroundColor: "",
  })
</script>
