<script setup lang="ts">
import { ref } from "vue";
import { skills } from "@/assets/skills.json";
import SkillChip from "./SkillPill.vue";

interface Skill {
  name: string;
  color: string;
  url: string;
  icon: string;
}

const skillsList = ref<Skill[]>(skills);
</script>

<template>
  <v-card class="m3-card skills-card" variant="outlined" rounded="2xl">
    <div class="skills-wrap">
      <SkillChip
        v-for="skill in skillsList"
        :key="skill.name"
        :text="skill.name"
        :href="skill.url"
        :color="skill.color"
        :prepend-icon="`mdi-${skill.icon}`"
        rounded
        outlined
        variant="elevated"
        class="skill-item"
      />
    </div>
  </v-card>
</template>

<style scoped>
.skills-card {
  padding: var(--space-5);
  width: 100%;
}

.skills-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.skill-item {
  font-weight: 500;
  transition: transform var(--transition-fast);
}

.skill-item:hover {
  transform: translateY(-2px);
}
</style>
