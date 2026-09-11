<script setup lang="ts">
import { ref } from "vue";
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
</script>

<template>
  <div class="resume-container">
    <!-- View Switcher (Cards vs Timeline) -->
    <div class="d-flex justify-end align-center mb-6 no-print">
      <v-btn-toggle
        v-model="viewMode"
        mandatory
        color="primary"
        variant="outlined"
        density="compact"
        rounded="lg"
      >
        <v-btn value="timeline" prepend-icon="mdi-timeline-outline">
          Timeline View
        </v-btn>
        <v-btn value="cards" prepend-icon="mdi-view-grid-outline">
          Cards Grid
        </v-btn>
      </v-btn-toggle>
    </div>

    <!-- 1. Horizontal Timeline Layout: Left to Right (Most Recent First) -->
    <div v-if="viewMode === 'timeline'" class="horizontal-timeline-wrapper">
      <div class="timeline-hint text-caption text-medium-emphasis mb-3 d-flex align-center gap-2 no-print">
        <v-icon icon="mdi-gesture-swipe-horizontal" size="18" color="primary" />
        <span>Scroll horizontally to explore career journey (Most Recent on left ➔ Previous roles)</span>
      </div>

      <div class="horizontal-scroll-area">
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
            <template
              v-if="parsePeriod(section.sub_heading)"
              #opposite
            >
              <div class="timeline-opposite-pill">
                <v-chip
                  size="small"
                  color="primary"
                  variant="tonal"
                  class="font-weight-bold"
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
    <v-divider class="my-8 opacity-20" />
    <div class="bottom-bar">
      <VideoPreviewWrapper
        title="Intro Video"
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

/* Horizontal Timeline styles */
.horizontal-timeline-wrapper {
  width: 100%;
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
  padding-bottom: var(--space-4);
}

.career-timeline-horizontal :deep(.v-timeline-item__body) {
  width: 380px !important;
  max-width: 420px !important;
}

.career-timeline-horizontal :deep(.v-timeline-item__opposite) {
  width: 380px !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline-opposite-pill {
  display: flex;
  align-items: center;
  justify-content: center;
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
}
</style>
