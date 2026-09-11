<script setup lang="ts">
import { computed } from "vue";

interface Props {
  text: string;
  size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  underline?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: "h1",
  underline: false,
});

const headingTag = computed(() => props.size.toLowerCase());
</script>

<template>
  <component
    :is="headingTag"
    :class="['heading', { 'heading--underline': props.underline }, `heading--${props.size}`]"
  >
    {{ props.text }}
  </component>
</template>

<style scoped>
.heading {
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text-main);
  margin: 0;
  margin-bottom: var(--space-6);
}

.heading--h1 {
  font-size: 2rem;
}

.heading--h2 {
  font-size: 1.75rem;
}

.heading--h3 {
  font-size: 1.5rem;
}

.heading--h4 {
  font-size: 1.25rem;
}

.heading--h5 {
  font-size: 1.1rem;
}

.heading--h6 {
  font-size: 1rem;
}

.heading--underline {
  text-decoration: underline;
  text-underline-offset: 6px;
  text-decoration-color: var(--color-primary);
}
</style>
