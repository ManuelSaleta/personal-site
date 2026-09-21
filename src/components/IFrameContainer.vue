<script setup lang="ts">
import { computed } from "vue";

interface Props {
  /**
   * The YouTube video ID or full YouTube/Shorts URL
   * e.g., 'dQw4w9WgXcQ' or 'https://www.youtube.com/shorts/dQw4w9WgXcQ'
   */
  videoId: string;
  /**
   * Title for accessibility
   */
  title?: string;
  /**
   * Optional custom aspect ratio (default: '9/16')
   */
  aspectRatio?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "YouTube video player",
  aspectRatio: "9/16",
});

// Extract video ID if user provides a full YouTube or Shorts URL
const cleanVideoId = computed(() => {
  const idOrUrl = props.videoId.trim();

  // Handles /shorts/ID or v=ID or raw ID
  const match = idOrUrl.match(/(?:shorts\/|v=|\/embed\/|youtu\.be\/|\/v\/|^)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : idOrUrl;
});

const embedUrl = computed(() => {
  return `https://www.youtube-nocookie.com/embed/${cleanVideoId.value}?rel=0&modestbranding=1`;
});
</script>

<template>
  <div class="vertical-embed-container">
    <div class="iframe-wrapper" :style="{ aspectRatio: props.aspectRatio }">
      <iframe
        :src="embedUrl"
        :title="props.title"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        loading="lazy"
      />
    </div>
  </div>
</template>

<style scoped>
.vertical-embed-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.iframe-wrapper {
  position: relative;
  width: 100%;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background-color: #000000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}

.iframe-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
