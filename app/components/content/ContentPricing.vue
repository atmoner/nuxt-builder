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
        <p class="text-xl text-gray-600">{{ subtitle }}</p>
      </div>

      <!-- Pricing Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Plan 1 -->
        <div class="border border-gray-200 rounded-2xl p-8">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            {{ plan1Name }}
          </h3>
          <div class="mb-6">
            <span class="text-4xl font-bold text-gray-900">{{
              plan1Price
            }}</span>
            <span class="text-gray-500">/month</span>
          </div>
          <ul class="space-y-3 mb-8">
            <li
              v-for="feature in parsedPlan1Features"
              :key="feature"
              class="flex items-center gap-2 text-gray-600"
            >
              <svg
                class="w-5 h-5 text-green-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {{ feature }}
            </li>
          </ul>
          <a
            :href="plan1ButtonUrl"
            class="block w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center"
          >
            Get Started
          </a>
        </div>

        <!-- Plan 2 (Highlighted) -->
        <div
          :class="[
            'rounded-2xl p-8 relative',
            plan2Highlighted
              ? 'border-2 border-primary-600 bg-primary-50'
              : 'border border-gray-200',
          ]"
        >
          <div
            v-if="plan2Highlighted"
            class="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-600 text-white text-sm font-medium rounded-full"
          >
            Most Popular
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            {{ plan2Name }}
          </h3>
          <div class="mb-6">
            <span class="text-4xl font-bold text-gray-900">{{
              plan2Price
            }}</span>
            <span class="text-gray-500">/month</span>
          </div>
          <ul class="space-y-3 mb-8">
            <li
              v-for="feature in parsedPlan2Features"
              :key="feature"
              class="flex items-center gap-2 text-gray-600"
            >
              <svg
                class="w-5 h-5 text-green-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {{ feature }}
            </li>
          </ul>
          <a
            :href="plan2ButtonUrl"
            class="block w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors text-center"
          >
            Get Started
          </a>
        </div>

        <!-- Plan 3 -->
        <div class="border border-gray-200 rounded-2xl p-8">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            {{ plan3Name }}
          </h3>
          <div class="mb-6">
            <span class="text-4xl font-bold text-gray-900">{{
              plan3Price
            }}</span>
            <span class="text-gray-500">/month</span>
          </div>
          <ul class="space-y-3 mb-8">
            <li
              v-for="feature in parsedPlan3Features"
              :key="feature"
              class="flex items-center gap-2 text-gray-600"
            >
              <svg
                class="w-5 h-5 text-green-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {{ feature }}
            </li>
          </ul>
          <a
            :href="plan3ButtonUrl"
            class="block w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center"
          >
            Contact Sales
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  interface Props {
    title?: string
    subtitle?: string
    plan1Name?: string
    plan1Price?: string
    plan1Features?: string
    plan1ButtonUrl?: string
    plan2Name?: string
    plan2Price?: string
    plan2Features?: string
    plan2Highlighted?: boolean
    plan2ButtonUrl?: string
    plan3Name?: string
    plan3Price?: string
    plan3Features?: string
    plan3ButtonUrl?: string
    backgroundColor?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    title: "Simple Pricing",
    subtitle: "Choose the plan that works for you",
    plan1Name: "Starter",
    plan1Price: "$9",
    plan1Features: "5 Projects, Basic Support, 1GB Storage",
    plan1ButtonUrl: "#",
    plan2Name: "Pro",
    plan2Price: "$29",
    plan2Features: "Unlimited Projects, Priority Support, 10GB Storage",
    plan2Highlighted: true,
    plan2ButtonUrl: "#",
    plan3Name: "Enterprise",
    plan3Price: "$99",
    plan3Features: "Everything in Pro, Custom Integrations, Dedicated Support",
    plan3ButtonUrl: "#",
    backgroundColor: "",
  })

  const parsedPlan1Features = computed(() =>
    props.plan1Features
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean)
  )
  const parsedPlan2Features = computed(() =>
    props.plan2Features
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean)
  )
  const parsedPlan3Features = computed(() =>
    props.plan3Features
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean)
  )
</script>
