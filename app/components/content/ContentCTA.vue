<template>
  <section
    :class="[
      'py-16 px-6',
      !backgroundColor && variant === 'primary'
        ? 'bg-primary-600 text-white'
        : '',
      !backgroundColor && variant === 'dark' ? 'bg-gray-900 text-white' : '',
      !backgroundColor && variant === 'light' ? 'bg-gray-50 text-gray-900' : '',
    ]"
    :style="backgroundColor ? { backgroundColor } : {}"
  >
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ title }}</h2>
      <p
        :class="[
          'text-xl mb-8',
          variant === 'light' ? 'text-gray-600' : 'text-white/80',
        ]"
      >
        {{ subtitle }}
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <a
          :href="buttonUrl"
          :class="[
            'inline-block px-8 py-3 rounded-lg font-semibold transition-colors',
            variant !== 'light'
              ? 'bg-white text-gray-900 hover:bg-gray-100'
              : 'bg-primary-600 text-white hover:bg-primary-700',
          ]"
        >
          {{ buttonText }}
        </a>
        <a
          :href="secondaryButtonUrl"
          :class="[
            'inline-block px-8 py-3 rounded-lg font-semibold transition-colors',
            variant !== 'light'
              ? 'border-2 border-white text-white hover:bg-white/10'
              : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-200',
          ]"
        >
          {{ secondaryButtonText }}
        </a>
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
    variant?: "primary" | "dark" | "light"
    backgroundColor?: string
  }

  withDefaults(defineProps<Props>(), {
    title: "Ready to Get Started?",
    subtitle: "Join thousands of satisfied customers today",
    buttonText: "Start Free Trial",
    buttonUrl: "#",
    secondaryButtonText: "Contact Sales",
    secondaryButtonUrl: "#",
    variant: "primary",
    backgroundColor: "",
  })
</script>
