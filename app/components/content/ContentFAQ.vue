<template>
  <section class="py-16 px-4" :style="bgStyle">
    <div class="container mx-auto max-w-4xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {{ title }}
        </h2>
        <p class="text-lg text-gray-600">
          {{ subtitle }}
        </p>
      </div>

      <!-- Accordion Layout -->
      <div v-if="layout === 'accordion'" class="space-y-4">
        <div
          v-for="(item, index) in questionList"
          :key="index"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <button
            class="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            @click="toggleQuestion(Number(index))"
          >
            <span class="font-semibold text-gray-900">{{ item.question }}</span>
            <svg
              class="w-5 h-5 text-gray-500 transition-transform"
              :class="{ 'rotate-180': openQuestions.has(Number(index)) }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-96 opacity-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="max-h-96 opacity-100"
            leave-to-class="max-h-0 opacity-0"
          >
            <div
              v-show="openQuestions.has(Number(index))"
              class="overflow-hidden"
            >
              <div class="px-6 py-4 bg-gray-50 text-gray-700">
                {{ item.answer }}
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Two Column Layout -->
      <div v-else class="grid md:grid-cols-2 gap-8">
        <div
          v-for="(item, index) in questionList"
          :key="index"
          class="bg-white rounded-lg shadow-md p-6"
        >
          <h3 class="font-semibold text-gray-900 mb-3">{{ item.question }}</h3>
          <p class="text-gray-600">{{ item.answer }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const props = defineProps<{
    title?: string
    subtitle?: string
    questions?: string | Array<{ question: string; answer: string }>
    layout?: "accordion" | "two-column"
    backgroundColor?: string
  }>()

  const openQuestions = ref<Set<number>>(new Set([0]))

  const questionList = computed(() => {
    if (!props.questions) return []
    if (typeof props.questions === "string") {
      try {
        return JSON.parse(props.questions)
      } catch {
        return []
      }
    }
    return props.questions
  })

  const bgStyle = computed(() => {
    if (props.backgroundColor) {
      return { backgroundColor: props.backgroundColor }
    }
    return {}
  })

  const toggleQuestion = (index: number) => {
    if (openQuestions.value.has(index)) {
      openQuestions.value.delete(index)
    } else {
      openQuestions.value.add(index)
    }
  }
</script>
