<template>
  <div class="resume-base">
    <div
      class="resume-section"
      v-for="section in resume.experience"
      :key="section.id"
    >
      <ResumeSection
        :heading="section.heading"
        :sub-heading="section.sub_heading"
        :contributions="section.contributions"
      />
    </div>

    <hr />
    <div class="flex flex-direction: row-auto justify-between align-baseline">
      <VideoPreviewWrapper
        title="Click me"
        thumbnailUrl="https://img.youtube.com/vi/dj-GyXD9ZSc/maxresdefault.jpg"
      >
        <IFrameContainer videoId="dj-GyXD9ZSc" />
      </VideoPreviewWrapper>
      <ResumeDownloadBtn />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ResumeSection from "./ResumeSection.vue";
import resumeData from "@/assets/resume.json";
import ResumeDownloadBtn from "./ResumeDownloadBtn.vue";

interface ResumeSection {
  id: number;
  heading: string;
  sub_heading: string;
  contributions: string[];
}

interface Resume {
  experience: ResumeSection[];
}

const resume = ref<Resume>(resumeData as Resume);
</script>

<style scoped>
/* styles for ResumeBase */
</style>
