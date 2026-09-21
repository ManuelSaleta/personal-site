<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from "vue";
import ResumeSection from "./ResumeSection.vue";
import resumeData from "@/assets/resume.json";
import ResumeDownloadBtn from "./ResumeDownloadBtn.vue";
import VideoPreviewWrapper from "./VideoPreviewWrapper.vue";
import IFrameContainer from "./IFrameContainer.vue";

interface ExperienceItem {
  id: number;
  heading: string;
  sub_heading: string;
  contributions: string[];
}

interface Resume {
  experience: ExperienceItem[];
}

const resume = ref<Resume>(resumeData as Resume);
const viewMode = ref<"cards" | "timeline">("timeline");

function parsePeriod(subHeading: string): string {
  const parts = (subHeading || "").split("|").map((s) => s.trim());
  return parts[1] || "";
}

// Edge glow indicators state & detection
const scrollAreaRef = ref<HTMLElement | null>(null);
const isAtLeft = ref(false);
const isAtRight = ref(false);
const hitLeft = ref(false);
const hitRight = ref(false);
let userHasScrolled = false;
let leftHitTimer: ReturnType<typeof setTimeout> | null = null;
let rightHitTimer: ReturnType<typeof setTimeout> | null = null;
let prevScrollLeft = 0;

function triggerHit(direction: "left" | "right") {
  if (direction === "left") {
    hitLeft.value = true;
    if (leftHitTimer) clearTimeout(leftHitTimer);
    leftHitTimer = setTimeout(() => {
      hitLeft.value = false;
    }, 650);
  } else {
    hitRight.value = true;
    if (rightHitTimer) clearTimeout(rightHitTimer);
    rightHitTimer = setTimeout(() => {
      hitRight.value = false;
    }, 650);
  }
}

function checkScrollBounds() {
  const el = scrollAreaRef.value;
  if (!el) return;

  const { scrollLeft, scrollWidth, clientWidth } = el;
  const maxScroll = Math.max(0, scrollWidth - clientWidth);
  const threshold = 16;

  const atLeft = scrollLeft <= threshold;
  const atRight = scrollLeft >= maxScroll - threshold;

  if (userHasScrolled) {
    if (atLeft && !isAtLeft.value && scrollLeft <= prevScrollLeft) {
      triggerHit("left");
    }
    if (atRight && !isAtRight.value && scrollLeft >= prevScrollLeft) {
      triggerHit("right");
    }
  }

  isAtLeft.value = atLeft && userHasScrolled;
  isAtRight.value = atRight && userHasScrolled;
  prevScrollLeft = scrollLeft;
}

function handleScroll() {
  userHasScrolled = true;
  checkScrollBounds();
}

function handleWheel(event: WheelEvent) {
  const el = scrollAreaRef.value;
  if (!el) return;

  const { scrollLeft, scrollWidth, clientWidth } = el;
  const maxScroll = Math.max(0, scrollWidth - clientWidth);

  // If scrolling horizontally and at left end attempting to scroll further left
  if (scrollLeft <= 16 && (event.deltaX < -4 || (event.shiftKey && event.deltaY < -4))) {
    userHasScrolled = true;
    isAtLeft.value = true;
    triggerHit("left");
  }
  // If scrolling horizontally and at right end attempting to scroll further right
  else if (
    scrollLeft >= maxScroll - 16 &&
    (event.deltaX > 4 || (event.shiftKey && event.deltaY > 4))
  ) {
    userHasScrolled = true;
    isAtRight.value = true;
    triggerHit("right");
  }
}

watch(viewMode, (newVal) => {
  if (newVal === "timeline") {
    nextTick(() => {
      userHasScrolled = false;
      isAtLeft.value = false;
      isAtRight.value = false;
    });
  }
});

function handleResize() {
  if (viewMode.value === "timeline") {
    checkScrollBounds();
  }
}

onMounted(() => {
  window.addEventListener("resize", handleResize, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  if (leftHitTimer) clearTimeout(leftHitTimer);
  if (rightHitTimer) clearTimeout(rightHitTimer);
});
</script>

<template>
  <div class="resume-container">
    <!-- View Switcher (Cards vs Timeline) -->
    <div class="view-toggle-row no-print">
      <v-btn-toggle
        v-model="viewMode"
        mandatory
        color="primary"
        variant="outlined"
        density="compact"
        rounded="lg"
      >
        <v-btn value="timeline" prepend-icon="mdi-timeline-outline"> Timeline View </v-btn>
        <v-btn value="cards" prepend-icon="mdi-view-grid-outline"> Cards Grid </v-btn>
      </v-btn-toggle>
    </div>

    <!-- 1. Horizontal Timeline Layout: Left to Right (Most Recent First) -->
    <div v-if="viewMode === 'timeline'" class="horizontal-timeline-wrapper">
      <div class="timeline-hint no-print">
        <v-icon icon="mdi-gesture-swipe-horizontal" size="18" color="primary" />
        <span
          >Scroll horizontally to explore career journey (Most Recent on left ➔ Previous
          roles)</span
        >
      </div>

      <div class="timeline-scroll-container">
        <!-- Soft Glow Edge Indicators -->
        <div
          class="edge-glow edge-glow-left"
          :class="{ 'is-active': isAtLeft, 'is-hit': hitLeft }"
          aria-hidden="true"
        />
        <div
          class="edge-glow edge-glow-right"
          :class="{ 'is-active': isAtRight, 'is-hit': hitRight }"
          aria-hidden="true"
        />

        <div
          ref="scrollAreaRef"
          class="horizontal-scroll-area"
          @scroll.passive="handleScroll"
          @wheel.passive="handleWheel"
        >
          <v-timeline
            direction="horizontal"
            align="center"
            truncate-line="both"
            class="career-timeline-horizontal"
          >
            <v-timeline-item
              v-for="section in resume.experience"
              :key="section.id"
              dot-color="primary"
              size="small"
              fill-dot
              class="timeline-horizontal-item"
            >
              <template #icon>
                <v-icon icon="mdi-briefcase-outline" size="14" color="white" />
              </template>

              <!-- Opposite slot shows date badge above/below the horizontal line -->
              <template v-if="parsePeriod(section.sub_heading)" #opposite>
                <div class="timeline-opposite-pill">
                  <v-chip
                    size="small"
                    color="primary"
                    variant="tonal"
                    class="opposite-chip"
                    prepend-icon="mdi-calendar-range"
                  >
                    {{ parsePeriod(section.sub_heading) }}
                  </v-chip>
                </div>
              </template>

              <ResumeSection
                :heading="section.heading"
                :sub-heading="section.sub_heading"
                :contributions="section.contributions"
              />
            </v-timeline-item>
          </v-timeline>
        </div>
      </div>
    </div>

    <!-- 2. Cards Layout: 2-Column Responsive Grid -->
    <div v-else class="cards-grid">
      <ResumeSection
        v-for="section in resume.experience"
        :key="section.id"
        :heading="section.heading"
        :sub-heading="section.sub_heading"
        :contributions="section.contributions"
      />
    </div>

    <!-- Bottom Actions / Extras -->
    <v-divider class="bottom-divider" />
    <div class="bottom-bar">
      <VideoPreviewWrapper
        label="Watch Quick Intro"
        thumbnailUrl="https://img.youtube.com/vi/dj-GyXD9ZSc/maxresdefault.jpg"
      >
        <IFrameContainer videoId="dj-GyXD9ZSc" />
      </VideoPreviewWrapper>

      <ResumeDownloadBtn />
    </div>
  </div>
</template>

<style scoped>
.resume-container {
  width: 100%;
}

.view-toggle-row {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: var(--space-6);
}

.timeline-hint {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.8rem;
  color: var(--color-text-muted);
  margin-bottom: var(--space-3);
}

.opposite-chip {
  font-weight: 700;
}

/* Horizontal Timeline styles */
.horizontal-timeline-wrapper {
  width: 100%;
}

.timeline-scroll-container {
  position: relative;
  width: 100%;
}

/* Soft Glow Edge Indicators (50% narrower & localized height) */
.edge-glow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 260px;
  max-height: 55%;
  width: 36px;
  pointer-events: none;
  z-index: 10;
  opacity: 0;
  transition:
    opacity var(--transition-normal),
    transform var(--transition-normal);
}

.edge-glow-left {
  left: 0;
  border-radius: 0 var(--radius-pill) var(--radius-pill) 0;
  background: radial-gradient(
    ellipse at 0% 50%,
    rgba(var(--v-theme-primary), 0.55) 0%,
    rgba(var(--v-theme-primary), 0.2) 50%,
    transparent 85%
  );
  box-shadow: inset 10px 0 16px -4px rgba(var(--v-theme-primary), 0.6);
}

.edge-glow-right {
  right: 0;
  border-radius: var(--radius-pill) 0 0 var(--radius-pill);
  background: radial-gradient(
    ellipse at 100% 50%,
    rgba(var(--v-theme-primary), 0.55) 0%,
    rgba(var(--v-theme-primary), 0.2) 50%,
    transparent 85%
  );
  box-shadow: inset -10px 0 16px -4px rgba(var(--v-theme-primary), 0.6);
}

.edge-glow::before {
  content: "";
  position: absolute;
  top: 15%;
  bottom: 15%;
  width: 3px;
  border-radius: var(--radius-pill);
  background: var(--color-primary);
  opacity: 0.85;
  filter: blur(1px);
  box-shadow: 0 0 10px 2px rgba(var(--v-theme-primary), 0.85);
}

.edge-glow-left::before {
  left: 2px;
}

.edge-glow-right::before {
  right: 2px;
}

.edge-glow.is-active {
  opacity: 0.9;
}

.edge-glow.is-hit {
  opacity: 1;
  animation: edge-glow-pulse 0.65s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes edge-glow-pulse {
  0% {
    opacity: 0.3;
    transform: translateY(-50%) scaleX(0.7);
  }
  45% {
    opacity: 1;
    transform: translateY(-50%) scaleX(1.3);
  }
  100% {
    opacity: 0.9;
    transform: translateY(-50%) scaleX(1);
  }
}

.horizontal-scroll-area {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding: var(--space-4) var(--space-2);
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--v-theme-primary), 0.4) transparent;
}

.horizontal-scroll-area::-webkit-scrollbar {
  height: 8px;
}

.horizontal-scroll-area::-webkit-scrollbar-track {
  background: rgba(var(--v-border-color), 0.08);
  border-radius: var(--radius-pill);
}

.horizontal-scroll-area::-webkit-scrollbar-thumb {
  background: rgba(var(--v-theme-primary), 0.35);
  border-radius: var(--radius-pill);
}

.horizontal-scroll-area::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--v-theme-primary), 0.65);
}

.career-timeline-horizontal {
  width: max-content !important;
  min-width: 100%;
  grid-auto-columns: 462px !important;
  padding: var(--space-4) 60px var(--space-6);
}

.career-timeline-horizontal :deep(.v-timeline-item__body) {
  width: 740px !important;
  max-width: 740px !important;
  margin-inline: -39px !important;
  padding-inline: 0 !important;
}

.career-timeline-horizontal :deep(.v-timeline-item__opposite) {
  width: 100% !important;
  max-width: 462px !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline-opposite-pill {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 600px) {
  .career-timeline-horizontal {
    grid-auto-columns: 290px !important;
    padding: var(--space-2) 24px var(--space-4);
  }

  .career-timeline-horizontal :deep(.v-timeline-item__body) {
    width: 340px !important;
    max-width: 340px !important;
    margin-inline: -25px !important;
  }

  .career-timeline-horizontal :deep(.v-timeline-item__opposite) {
    max-width: 290px !important;
  }
}

/* Cards Mode: 2-column Grid on Desktop */
.cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-5);

  @media (min-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.bottom-divider {
  margin: var(--space-8) 0;
  opacity: 0.15;
}

.bottom-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-2) 0;
}

@media print {
  .horizontal-scroll-area {
    overflow: visible !important;
  }

  .edge-glow {
    display: none !important;
  }
}
</style>
