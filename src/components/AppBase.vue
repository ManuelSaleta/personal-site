<script setup lang="ts">
import AboutMe from "./ResumeAbout.vue";
import ResumeBase from "./ResumeBase.vue";
import SkillsList from "./SkillsList.vue";
</script>

<template>
  <v-container fluid class="site-container">
    <!-- 1. Hero / Profile Header -->
    <AboutMe />

    <!-- 2. Professional Experience Section -->
    <section class="site-section">
      <div class="section-heading">
        <v-icon icon="mdi-briefcase-outline" size="22" class="heading-icon" />
        <span>Professional Experience</span>
      </div>
      <ResumeBase />
    </section>

    <!-- 3. Skills Section -->
    <section class="site-section">
      <div class="section-heading">
        <v-icon icon="mdi-xml" size="22" class="heading-icon" />
        <span>Relevant Skills</span>
      </div>
      <SkillsList />
    </section>
  </v-container>
</template>

<style scoped>
.site-container {
  width: 90% !important;
  max-width: 90% !important;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-6) var(--space-4);
  margin: 0 auto;
}

.site-section {
  margin-top: var(--space-8);
}
</style>
