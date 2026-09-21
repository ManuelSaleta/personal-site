<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  heading: string;
  subHeading: string;
  contributions: string[];
  technologies?: string[];
}>();

// Split "COMPANY | DATE" or "ROLE | FOCUS" cleanly
const parsedMeta = computed(() => {
  const parts = (props.subHeading || "").split("|").map((s) => s.trim());
  return {
    company: parts[0] || "",
    period: parts[1] || "",
  };
});

// Detect relevant tech tags from contributions if not explicitly passed
const displayedTechs = computed(() => {
  if (props.technologies && props.technologies.length > 0) {
    return props.technologies;
  }
  const allText = props.contributions.join(" ");
  const keywords = [
    ".NET 10",
    ".NET Core",
    "C#",
    "ASP.NET",
    "Kubernetes",
    "Docker",
    "Terraform",
    "AWS",
    "Azure",
    "Angular",
    "Vue.js",
    "TypeScript",
    "Dapper",
    "RabbitMQ",
    "Auth0",
    "Tailscale",
    "Cloudflare",
    "Python",
    "Ruby",
  ];
  return keywords.filter((kw) => allText.toLowerCase().includes(kw.toLowerCase()));
});
</script>

<template>
  <v-card class="m3-card experience-card" variant="outlined" rounded="xl">
    <!-- Header Grouping: Icon, Role, Company, and Period Badge -->
    <v-card-item class="header-item">
      <template #prepend>
        <v-avatar color="primary" variant="tonal" size="42" class="role-avatar">
          <v-icon icon="mdi-briefcase-outline" size="22" />
        </v-avatar>
      </template>

      <div class="header-container">
        <div class="role-group">
          <v-card-title class="role-title">
            {{ heading }}
          </v-card-title>
          <div class="entity-subtitle">
            {{ parsedMeta.company }}
          </div>
        </div>

        <v-chip
          v-if="parsedMeta.period"
          size="small"
          color="primary"
          variant="tonal"
          class="period-badge"
        >
          <v-icon icon="mdi-calendar-range" start size="14" />
          {{ parsedMeta.period }}
        </v-chip>
      </div>
    </v-card-item>

    <v-divider class="divider-subtle" />

    <!-- Content Grouping: Bullet points -->
    <v-card-text class="card-content">
      <ul class="resume-bullet-list">
        <li v-for="(item, idx) in contributions" :key="idx">
          {{ item }}
        </li>
      </ul>

      <!-- Contextual Technologies Grouping -->
      <div v-if="displayedTechs.length > 0" class="tech-stack-group">
        <span class="tech-stack-label">Key Stack:</span>
        <div class="tech-chips">
          <v-chip
            v-for="tech in displayedTechs"
            :key="tech"
            size="x-small"
            variant="tonal"
            color="secondary"
            class="tech-chip"
          >
            {{ tech }}
          </v-chip>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
/* Component-specific orchestration & micro-interactions */
.experience-card {
  width: 100%;
}

.experience-card:hover {
  transform: translateY(-2px);
  border-color: rgba(var(--v-theme-primary), 0.4) !important;
  box-shadow: 0 10px 28px -6px rgba(0, 0, 0, 0.1);
}

.header-item {
  padding-bottom: var(--space-2);
}

.role-avatar {
  margin-right: var(--space-3);
}

.header-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  width: 100%;
}

.role-group {
  display: flex;
  flex-direction: column;
}

.role-title {
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  padding: 0;
  line-height: 1.35;
}

.period-badge {
  font-weight: 500;
  letter-spacing: 0.02em;
}

.divider-subtle {
  margin: 0 var(--space-4);
  opacity: 0.15;
}

.card-content {
  padding-top: var(--space-3);
  padding-bottom: var(--space-4);
}

.tech-stack-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-4);
  padding-top: var(--space-2);
  border-top: 1px dashed var(--color-border);
}

.tech-stack-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
}

.tech-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.tech-chip {
  font-weight: 500;
}

@media print {
  .experience-card {
    break-inside: avoid;
    border: 1px solid #d1d5db !important;
    box-shadow: none !important;
  }
}
</style>
