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
  <!-- Wrapper constrained to half-width (max-w-40 = 160px) -->
  <div ref="containerRef" class="relative inline-block w-full max-w-40">
    <!-- Base Trigger Button -->
    <button
      type="button"
      class="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-slate-900 px-3 py-2.5 text-xs font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl active:translate-y-0"
      :aria-label="props.label"
      @click="openVideo"
    >
      <!-- Optional Background Thumbnail -->
      <div
        v-if="props.thumbnailUrl"
        class="absolute inset-0 bg-cover bg-center opacity-25 transition-opacity duration-300 group-hover:opacity-40"
        :style="{ backgroundImage: `url(${props.thumbnailUrl})` }"
      />

      <!-- Button Content (Proportionally scaled down) -->
      <div class="relative z-10 flex items-center gap-1.5 min-w-0">
        <span
          class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-white shadow-md shadow-red-600/40 transition-transform duration-200 group-hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="ml-0.5 h-3.5 w-3.5"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span class="truncate tracking-wide shadow-black drop-shadow-xs">{{
          props.label
        }}</span>
      </div>
    </button>

    <!-- Floating Overlay Embed (Maintains proper player size while anchoring to the smaller button) -->
    <Transition
      enter-active-class="transition duration-250 cubic-bezier(0.16, 1, 0.3, 1)"
      enter-from-class="opacity-0 -translate-x-1/2 translate-y-2 scale-95"
      enter-to-class="opacity-100 -translate-x-1/2 translate-y-0 scale-100"
      leave-active-class="transition duration-200 cubic-bezier(0.16, 1, 0.3, 1)"
      leave-from-class="opacity-100 -translate-x-1/2 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-x-1/2 translate-y-2 scale-95"
    >
      <div
        v-if="isExpanded"
        class="absolute bottom-full left-1/2 z-50 mb-3 w-90 max-w-[90vw] -translate-x-1/2 overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>
