<script setup lang="ts">
import SiteBase from "./components/AppBase.vue";
import SiteNavigation from "./components/AppNavigation.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <v-app class="app-root">
    <!-- Topographic Contours Ambient Background Layer -->
    <div class="ambient-background" aria-hidden="true">
      <div class="ambient-spotlight" />
      <svg
        class="topo-svg"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <path d="M-100 120 C 300 40, 650 220, 1050 100 C 1250 40, 1450 160, 1650 120" stroke="currentColor" stroke-width="1.3" />
        <path d="M-100 240 C 250 160, 580 320, 980 180 C 1220 100, 1420 260, 1650 220" stroke="currentColor" stroke-width="1.3" />
        <path d="M-100 370 C 350 280, 680 440, 1080 300 C 1280 220, 1480 380, 1650 340" stroke="currentColor" stroke-width="1.3" />
        <path d="M-100 510 C 220 420, 520 580, 920 450 C 1180 360, 1400 520, 1650 480" stroke="currentColor" stroke-width="1.3" />
        <path d="M-100 660 C 320 560, 640 710, 1040 590 C 1260 480, 1460 670, 1650 630" stroke="currentColor" stroke-width="1.3" />
        <path d="M-100 810 C 240 720, 560 860, 960 740 C 1200 640, 1440 820, 1650 780" stroke="currentColor" stroke-width="1.3" />
      </svg>
    </div>

    <v-main class="main-content">
      <SiteNavigation />
      <!-- If on home page, show SiteBase -->
      <SiteBase v-if="route.path === '/'" />
      <!-- Otherwise show routed pages -->
      <router-view v-else />
    </v-main>
  </v-app>
</template>

<style scoped>
.app-root {
  position: relative;
  min-height: 100vh;
}

.ambient-background {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  transition: opacity var(--transition-normal);
}

/* Shared Ambient Spotlight Blooms */
.ambient-spotlight {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle 750px at 50% 12%, rgba(var(--v-theme-primary), 0.14), transparent 70%),
    radial-gradient(circle 600px at 85% 65%, rgba(var(--v-theme-secondary), 0.08), transparent 70%),
    radial-gradient(circle 450px at 15% 85%, rgba(var(--v-theme-primary), 0.06), transparent 70%);
  filter: blur(40px);
}

/* Topographic Contours */
.topo-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  color: var(--color-primary);
  opacity: 0.12;
  mask-image: radial-gradient(ellipse 90% 75% at 50% 30%, black 40%, transparent 90%);
  -webkit-mask-image: radial-gradient(ellipse 90% 75% at 50% 30%, black 40%, transparent 90%);
}

.main-content {
  position: relative;
  z-index: 1;
}

@media print {
  .ambient-background {
    display: none !important;
  }
}
</style>
