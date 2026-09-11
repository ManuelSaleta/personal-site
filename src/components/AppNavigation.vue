<script setup lang="ts">
import { ref, computed } from "vue";
import { useTheme } from "vuetify";
import bannerImg from "@/assets/banner.png";
import resumePdf from "@/assets/manuel_saleta_resume.pdf";

const drawer = ref(false);
const theme = useTheme();

const isDark = computed(() => theme.global.current.value.dark);

function toggleTheme() {
  theme.global.name.value = isDark.value ? "light" : "dark";
}

const links = [
  { label: "Home", to: "/", icon: "mdi-home-outline" },
  // { label: "Books", to: "/BooksPage", icon: "mdi-book-open-outline" },
  // { label: "Poems", to: "/PoemsPage", icon: "mdi-feather" },
];
</script>

<template>
  <v-app-bar flat scroll-behavior="elevate" :image="bannerImg" class="m3-app-bar">
    <template #image>
      <v-img :src="bannerImg" cover class="banner-overlay" />
    </template>

    <v-app-bar-nav-icon
      v-if="links.length > 1"
      @click="drawer = !drawer"
      aria-label="Toggle navigation menu"
    />

    <v-avatar size="36" color="primary" variant="tonal" class="brand-avatar">
      <v-icon icon="mdi-code-braces" size="20" />
    </v-avatar>

    <v-app-bar-title class="brand-title">
      <span class="brand-name">Manuel Saleta</span>
      <span class="brand-separator">|</span>
      <span class="brand-tagline">Let's build something great together</span>
    </v-app-bar-title>

    <v-spacer />

    <!-- Action Buttons -->
    <div class="nav-actions">
      <!-- Quick Social Icons -->
      <v-btn
        icon="mdi-github"
        variant="text"
        size="small"
        href="https://github.com/ManuelSaleta"
        target="_blank"
        title="GitHub Profile"
      />

      <v-btn
        icon="mdi-linkedin"
        variant="text"
        size="small"
        href="https://www.linkedin.com/in/manuelsaleta/"
        target="_blank"
        title="LinkedIn Profile"
      />

      <!-- Dark / Light Mode Toggle -->
      <v-btn
        :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        variant="text"
        size="small"
        title="Toggle Theme"
        @click="toggleTheme"
      />

      <!-- Direct Resume Download Button -->
      <v-btn
        :href="resumePdf"
        download="Manuel_Saleta_Resume.pdf"
        target="_blank"
        color="primary"
        variant="tonal"
        size="small"
        prepend-icon="mdi-download"
        class="nav-resume-btn"
      >
        Resume PDF
      </v-btn>
    </div>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary>
    <v-list density="compact" nav>
      <v-list-item
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        :prepend-icon="link.icon"
        link
      >
        {{ link.label }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.m3-app-bar {
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(12px);
}

.banner-overlay {
  opacity: 0.15;
}

.brand-avatar {
  margin-left: var(--space-2);
  margin-right: var(--space-3);
}

.brand-title {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.brand-name {
  color: var(--color-text-main);
}

.brand-separator {
  margin: 0 var(--space-2);
  opacity: 0.5;
}

.brand-tagline {
  font-size: 0.75rem;
  font-weight: 500;
  opacity: 0.8;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  margin-right: var(--space-2);
}

.nav-resume-btn {
  margin-left: var(--space-2);
  font-weight: 500;
  display: none;

  @media (min-width: 600px) {
    display: inline-flex;
  }
}
</style>
