<template>
  <component
    :is="headingTag"
    :class="['heading', { 'heading--underline': underline }, `heading--${size}`]"
  >
    {{ text }}
  </component>
</template>

<script lang="ts">
export default {
  name: "PageHeading",
  props: {
    text: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: "h1",
      validator: (value: string) => ["h1", "h2", "h3", "h4", "h5", "h6"].includes(value),
    },
    underline: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    headingTag() {
      return this.size.toLowerCase();
    },
  },
};
</script>

<style scoped>
.heading {
  font-weight: bold;
  margin: 0;
  margin-bottom: 2rem;
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
}
</style>
