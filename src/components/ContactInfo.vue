<template>
  <div class="contact-links-wrap">
    <v-chip
      v-for="link in contactLinks"
      :key="link.url"
      :href="link.url"
      target="_blank"
      :prepend-icon="link.icon"
      color="primary"
      variant="tonal"
      class="contact-pill"
      rounded="pill"
      size="small"
    >
      {{ link.name }}
    </v-chip>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

const socialLinks: SocialLink[] = [
  {
    name: "+1 (305) 773-8214",
    url: "tel:+3057738214",
    icon: "mdi-phone-outline",
  },
  {
    name: "manny2206@gmail.com",
    url: "mailto:manny2206@gmail.com",
    icon: "mdi-email-outline",
  },
  {
    name: "Github",
    url: "https://github.com/ManuelSaleta",
    icon: "mdi-github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/manuelsaleta/",
    icon: "mdi-linkedin",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@theseriousprofessional/videos",
    icon: "mdi-youtube",
  },
];

// Logic to split data: Chips (Contact) vs Buttons (Socials)
const contactLinks = computed(() => socialLinks.filter((l) => l.name !== ""));
</script>

<style scoped>
.contact-links-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
}

.contact-pill {
  font-weight: 500;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  text-decoration: none !important;
}

.contact-pill:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px -2px rgba(var(--v-theme-primary), 0.3);
}
</style>
