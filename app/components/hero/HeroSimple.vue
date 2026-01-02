<template>
  <section
    :class="[
      'py-20 px-6',
      !backgroundColor && backgroundType === 'gradient'
        ? 'bg-gradient-to-br from-primary-600 to-primary-800 text-white'
        : '',
      !backgroundColor && backgroundType === 'dark'
        ? 'bg-gray-900 text-white'
        : '',
      !backgroundColor && backgroundType === 'light'
        ? 'bg-gray-50 text-gray-900'
        : '',
    ]"
    :style="backgroundColor ? { backgroundColor } : {}"
  >
    <div
      :class="[
        'max-w-4xl mx-auto',
        alignment === 'center' ? 'text-center' : '',
        alignment === 'left' ? 'text-left' : '',
        alignment === 'right' ? 'text-right' : '',
      ]"
    >
      <h1 class="text-4xl md:text-5xl font-bold mb-6">
        {{ title }}
      </h1>
      <p
        :class="[
          'text-xl mb-8 max-w-2xl',
          alignment === 'center' ? 'mx-auto' : '',
          alignment === 'right' ? 'ml-auto' : '',
          backgroundType === 'light' ? 'text-gray-600' : 'text-white/90',
        ]"
      >
        {{ subtitle }}
      </p>
      <a
        :href="buttonUrl"
        :class="[
          'inline-block px-8 py-3 rounded-lg font-semibold transition-all',
          buttonVariant === 'primary' && backgroundType !== 'light'
            ? 'bg-white text-primary-600 hover:bg-gray-100'
            : '',
          buttonVariant === 'primary' && backgroundType === 'light'
            ? 'bg-primary-600 text-white hover:bg-primary-700'
            : '',
          buttonVariant === 'secondary'
            ? 'bg-gray-800 text-white hover:bg-gray-700'
            : '',
          buttonVariant === 'white'
            ? 'bg-white text-gray-900 hover:bg-gray-100'
            : '',
        ]"
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
    buttonVariant?: "primary" | "secondary" | "white"
    alignment?: "left" | "center" | "right"
    backgroundType?: "gradient" | "dark" | "light"
    backgroundColor?: string
  }

  withDefaults(defineProps<Props>(), {
    title: "Welcome to Our Website",
    subtitle: "Build something amazing with our powerful tools",
    buttonText: "Get Started",
    buttonUrl: "#",
    buttonVariant: "primary",
    alignment: "center",
    backgroundType: "gradient",
    backgroundColor: "",
  })
</script>
