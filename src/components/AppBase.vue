<script setup lang="ts">
import AboutMe from "./ResumeAbout.vue";
import ResumeBase from "./ResumeBase.vue";
import SkillsList from "./SkillsList.vue";
</script>

<template>
  <v-container class="site-container py-6 px-4">
    <!-- 1. Hero / Profile Header -->
    <AboutMe />

    <!-- 2. Skills Section -->
    <section class="mt-8">
      <div class="section-heading">
        <v-icon icon="mdi-xml" size="22" class="heading-icon" />
        <span>Relevant Skills</span>
      </div>
      <SkillsList />
    </section>

    <!-- 3. Professional Experience Section -->
    <section class="mt-8">
      <div class="section-heading">
        <v-icon icon="mdi-briefcase-outline" size="22" class="heading-icon" />
        <span>Professional Experience</span>
      </div>
      <ResumeBase />
    </section>
  </v-container>
</template>

<style scoped>
.site-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin: 0 auto;
}
</style>
