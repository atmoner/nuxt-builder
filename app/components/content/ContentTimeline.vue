<template>
  <section class="py-16 px-4" :style="bgStyle">
    <div class="container mx-auto max-w-5xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {{ title }}
        </h2>
        <p class="text-lg text-gray-600">
          {{ subtitle }}
        </p>
      </div>

      <!-- Vertical Timeline -->
      <div v-if="orientation === 'vertical'" class="relative">
        <!-- Vertical line -->
        <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200"></div>

        <div class="space-y-12">
          <div
            v-for="(event, index) in eventList"
            :key="index"
            class="relative pl-20"
          >
            <!-- Circle marker -->
            <div
              class="absolute left-5 w-6 h-6 bg-primary-600 rounded-full border-4 border-white shadow-lg"
            ></div>

            <div class="bg-white rounded-lg shadow-lg p-6">
              <span
                class="inline-block px-3 py-1 bg-primary-100 text-primary-700 font-bold rounded-full text-sm mb-3"
              >
                {{ event.year }}
              </span>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                {{ event.title }}
              </h3>
              <p class="text-gray-600">{{ event.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Horizontal Timeline -->
      <div v-else class="relative overflow-x-auto pb-4">
        <div class="flex gap-8 min-w-max">
          <div
            v-for="(event, index) in eventList"
            :key="index"
            class="relative w-72"
          >
            <div class="bg-white rounded-lg shadow-lg p-6">
              <span
                class="inline-block px-3 py-1 bg-primary-100 text-primary-700 font-bold rounded-full text-sm mb-3"
              >
                {{ event.year }}
              </span>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                {{ event.title }}
              </h3>
              <p class="text-gray-600">{{ event.description }}</p>
            </div>

            <!-- Connector line -->
            <div
              v-if="Number(index) < eventList.length - 1"
              class="absolute top-8 right-0 w-8 h-0.5 bg-primary-200 translate-x-full"
            ></div>
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
    events?:
      | string
      | Array<{ year: string; title: string; description: string }>
    orientation?: "vertical" | "horizontal"
    backgroundColor?: string
  }>()

  const eventList = computed(() => {
    if (!props.events) return []
    if (typeof props.events === "string") {
      try {
        return JSON.parse(props.events)
      } catch {
        return []
      }
    }
    return props.events
  })

  const bgStyle = computed(() => {
    if (props.backgroundColor) {
      return { backgroundColor: props.backgroundColor }
    }
    return {}
  })
</script>
