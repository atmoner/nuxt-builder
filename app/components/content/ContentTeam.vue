<template>
  <section class="py-16 px-4" :style="bgStyle">
    <div class="container mx-auto max-w-7xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {{ title }}
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {{ subtitle }}
        </p>
      </div>

      <!-- Team Grid -->
      <div
        class="grid gap-8"
        :class="{
          'md:grid-cols-2': columns === 2,
          'md:grid-cols-3': columns === 3,
          'md:grid-cols-4': columns === 4,
        }"
      >
        <div
          v-for="(member, index) in memberList"
          :key="index"
          class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <img
            :src="member.image"
            :alt="member.name"
            class="w-full h-64 object-cover"
          />
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-1">
              {{ member.name }}
            </h3>
            <p class="text-primary-600 font-medium mb-3">{{ member.role }}</p>
            <p class="text-gray-600 text-sm">{{ member.bio }}</p>
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
    members?:
      | string
      | Array<{ name: string; role: string; image: string; bio: string }>
    columns?: number
    backgroundColor?: string
  }>()

  const memberList = computed(() => {
    if (!props.members) return []
    if (typeof props.members === "string") {
      try {
        return JSON.parse(props.members)
      } catch {
        return []
      }
    }
    return props.members
  })

  const bgStyle = computed(() => {
    if (props.backgroundColor) {
      return { backgroundColor: props.backgroundColor }
    }
    return { backgroundColor: "#f9fafb" }
  })
</script>
