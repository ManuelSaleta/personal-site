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
</script>

<template>
  <div class="resume-container">
    <!-- View Switcher (Cards vs Timeline) -->
    <div class="d-flex justify-end align-center mb-4 no-print">
      <v-btn-toggle
        v-model="viewMode"
        mandatory
        color="primary"
        variant="outlined"
        density="compact"
        rounded="lg"
      >
        <v-btn value="timeline" prepend-icon="mdi-timeline-outline"> Timeline </v-btn>
        <v-btn value="cards" prepend-icon="mdi-view-agenda-outline"> Cards </v-btn>
      </v-btn-toggle>
    </div>

    <!-- 1. Timeline Layout -->
    <v-timeline
      v-if="viewMode === 'timeline'"
      side="end"
      align="start"
      truncate-line="both"
      density="comfortable"
      class="career-timeline"
    >
      <v-timeline-item
        v-for="section in resume.experience"
        :key="section.id"
        dot-color="primary"
        size="small"
        fill-dot
        class="timeline-row"
      >
        <template #icon>
          <v-icon icon="mdi-briefcase-outline" size="14" color="white" />
        </template>
        <ResumeSection
          :heading="section.heading"
          :sub-heading="section.sub_heading"
          :contributions="section.contributions"
        />
      </v-timeline-item>
    </v-timeline>

    <!-- 2. Cards Layout -->
    <div v-else class="cards-stream">
      <ResumeSection
        v-for="section in resume.experience"
        :key="section.id"
        :heading="section.heading"
        :sub-heading="section.sub_heading"
        :contributions="section.contributions"
      />
    </div>

    <!-- Bottom Actions / Extras -->
    <v-divider class="my-6 opacity-20" />
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

.cards-stream {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.career-timeline :deep(.v-timeline-item__body) {
  padding-inline-start: var(--space-4) !important;
  width: 100%;
}

.bottom-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-2) 0;
}
</style>
