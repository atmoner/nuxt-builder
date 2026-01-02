<template>
  <section
    :class="[
      'py-16 px-6',
      !backgroundColor && theme === 'light' ? 'bg-white' : '',
      !backgroundColor && theme === 'dark' ? 'bg-gray-900 text-white' : '',
      !backgroundColor && theme === 'primary'
        ? 'bg-primary-600 text-white'
        : '',
    ]"
    :style="backgroundColor ? { backgroundColor } : {}"
  >
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="text-center">
          <div
            :class="[
              'text-4xl md:text-5xl font-bold mb-2',
              theme === 'light' ? 'text-gray-900' : 'text-white',
            ]"
          >
            {{ stat1Value }}
          </div>
          <div :class="[theme === 'light' ? 'text-gray-600' : 'text-white/80']">
            {{ stat1Label }}
          </div>
        </div>

        <div class="text-center">
          <div
            :class="[
              'text-4xl md:text-5xl font-bold mb-2',
              theme === 'light' ? 'text-gray-900' : 'text-white',
            ]"
          >
            {{ stat2Value }}
          </div>
          <div :class="[theme === 'light' ? 'text-gray-600' : 'text-white/80']">
            {{ stat2Label }}
          </div>
        </div>

        <div class="text-center">
          <div
            :class="[
              'text-4xl md:text-5xl font-bold mb-2',
              theme === 'light' ? 'text-gray-900' : 'text-white',
            ]"
          >
            {{ stat3Value }}
          </div>
          <div :class="[theme === 'light' ? 'text-gray-600' : 'text-white/80']">
            {{ stat3Label }}
          </div>
        </div>

        <div class="text-center">
          <div
            :class="[
              'text-4xl md:text-5xl font-bold mb-2',
              theme === 'light' ? 'text-gray-900' : 'text-white',
            ]"
          >
            {{ stat4Value }}
          </div>
          <div :class="[theme === 'light' ? 'text-gray-600' : 'text-white/80']">
            {{ stat4Label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  interface Props {
    stat1Value?: string
    stat1Label?: string
    stat2Value?: string
    stat2Label?: string
    stat3Value?: string
    stat3Label?: string
    stat4Value?: string
    stat4Label?: string
    theme?: "light" | "dark" | "primary"
    backgroundColor?: string
  }

  withDefaults(defineProps<Props>(), {
    stat1Value: "10K+",
    stat1Label: "Happy Customers",
    stat2Value: "99.9%",
    stat2Label: "Uptime",
    stat3Value: "24/7",
    stat3Label: "Support",
    stat4Value: "150+",
    stat4Label: "Countries",
    theme: "light",
    backgroundColor: "",
  })
</script>
