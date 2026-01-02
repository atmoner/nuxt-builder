<template>
  <div class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
    <slot>
      <UiCardHeader v-if="showHeader" :title="title" />
      <UiCardContent>{{ content }}</UiCardContent>
      <UiCardFooter v-if="showFooter && footerText">{{ footerText }}</UiCardFooter>
    </slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  content?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  footerText?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Card Title',
  content: 'Card content goes here...',
  showHeader: true,
  showFooter: false,
  footerText: '',
});
</script>
