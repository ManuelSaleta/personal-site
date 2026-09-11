<script setup lang="ts">
import { ref, onUnmounted, nextTick } from "vue";

interface Props {
  /**
   * Button label text
   */
  label?: string;
  /**
   * Optional thumbnail background image URL
   */
  thumbnailUrl?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  thumbnailUrl: "",
});

const isExpanded = ref(false);
const containerRef = ref<HTMLElement | null>(null);

function handleDocumentClick(event: MouseEvent) {
  if (!isExpanded.value) return;

  const target = event.target as Node | null;
  // Collapse if click happens outside wrapper
  if (containerRef.value && !containerRef.value.contains(target)) {
    closeVideo();
  }
}

function openVideo() {
  if (isExpanded.value) return;
  isExpanded.value = true;

  nextTick(() => {
    document.addEventListener("click", handleDocumentClick, true);
  });
}

function closeVideo() {
  isExpanded.value = false;
  document.removeEventListener("click", handleDocumentClick, true);
}

onUnmounted(() => {
  document.removeEventListener("click", handleDocumentClick, true);
});
</script>

<template>
  <div ref="containerRef" class="video-preview-wrapper">
    <!-- Base Trigger Button -->
    <button
      type="button"
      class="video-trigger-btn"
      :aria-label="props.label"
      @click="openVideo"
    >
      <!-- Optional Background Thumbnail -->
      <div
        v-if="props.thumbnailUrl"
        class="video-thumbnail-bg"
        :style="{ backgroundImage: `url(${props.thumbnailUrl})` }"
      />

      <!-- Button Content -->
      <div class="video-trigger-content">
        <span class="play-icon-badge">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="play-svg-icon"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span class="video-trigger-label">{{ props.label }}</span>
      </div>
    </button>

    <!-- Floating Overlay Embed -->
    <Transition name="video-modal">
      <div v-if="isExpanded" class="video-popup-modal">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.video-preview-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 180px;
}

.video-trigger-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  padding: var(--space-2) var(--space-3);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-main);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition:
    transform var(--transition-fast),
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.video-trigger-btn:hover {
  transform: translateY(-2px);
  border-color: rgba(var(--v-theme-primary), 0.4);
  box-shadow: 0 8px 20px -4px rgba(0, 0, 0, 0.16);
}

.video-trigger-btn:active {
  transform: translateY(0);
}

.video-thumbnail-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.2;
  transition: opacity var(--transition-normal);
}

.video-trigger-btn:hover .video-thumbnail-bg {
  opacity: 0.35;
}

.video-trigger-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
}

.play-icon-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border-radius: var(--radius-pill);
  background-color: #e50914;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(229, 9, 20, 0.4);
  transition: transform var(--transition-fast);
}

.video-trigger-btn:hover .play-icon-badge {
  transform: scale(1.1);
}

.play-svg-icon {
  width: 14px;
  height: 14px;
  margin-left: 1.5px;
}

.video-trigger-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.02em;
}

.video-popup-modal {
  position: absolute;
  bottom: calc(100% + var(--space-3));
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  width: 360px;
  max-width: 90vw;
  overflow: hidden;
  border-radius: var(--radius-2xl);
  background-color: #000000;
  box-shadow: 0 16px 36px -4px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

/* Modal Popup Transition */
.video-modal-enter-active,
.video-modal-leave-active {
  transition:
    opacity var(--transition-normal),
    transform var(--transition-normal);
}

.video-modal-enter-from,
.video-modal-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(8px) scale(0.95);
}

.video-modal-enter-to,
.video-modal-leave-from {
  opacity: 1;
  transform: translateX(-50%) translateY(0) scale(1);
}
</style>
