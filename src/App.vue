<script setup lang="ts">
import SiteBase from "./components/AppBase.vue";
import SiteNavigation from "./components/AppNavigation.vue";
import { useRoute } from "vue-router";
import { useBackgroundStyle } from "./composables/useBackgroundStyle";

const route = useRoute();
const { currentBackground } = useBackgroundStyle();
</script>

<template>
  <v-app class="app-root">
    <!-- Dynamic Ambient Background Layer -->
    <div
      v-if="currentBackground !== 'none'"
      class="ambient-background"
      :class="`bg-style-${currentBackground}`"
      aria-hidden="true"
    >
      <!-- 1. Dot Matrix (Cyber Hybrid) -->
      <template v-if="currentBackground === 'dots'">
        <div class="ambient-spotlight" />
        <div class="ambient-grid-dots" />
      </template>

      <!-- 2. Blueprint Wireframe Grid -->
      <template v-else-if="currentBackground === 'grid'">
        <div class="ambient-spotlight" />
        <div class="ambient-grid-wireframe" />
      </template>

      <!-- 3. Topographic Contours -->
      <template v-else-if="currentBackground === 'topo'">
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
      </template>

      <!-- 4. Angled Spotlight Beam -->
      <template v-else-if="currentBackground === 'beam'">
        <div class="conic-beam" />
        <div class="beam-glow" />
      </template>

      <!-- 5. Drifting Aurora Mesh -->
      <template v-else-if="currentBackground === 'aurora'">
        <div class="aurora-orb aurora-orb-1" />
        <div class="aurora-orb aurora-orb-2" />
        <div class="aurora-orb aurora-orb-3" />
      </template>
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

/* Mode 1: Dot Matrix */
.ambient-grid-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(var(--v-theme-on-surface), 0.08) 1.2px, transparent 1.2px);
  background-size: 28px 28px;
  mask-image: radial-gradient(ellipse 85% 70% at 50% 25%, black 35%, transparent 92%);
  -webkit-mask-image: radial-gradient(ellipse 85% 70% at 50% 25%, black 35%, transparent 92%);
}

/* Mode 2: Blueprint Wireframe Grid */
.ambient-grid-wireframe {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(var(--v-theme-on-surface), 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(var(--v-theme-on-surface), 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(ellipse 85% 70% at 50% 25%, black 35%, transparent 92%);
  -webkit-mask-image: radial-gradient(ellipse 85% 70% at 50% 25%, black 35%, transparent 92%);
}

/* Mode 3: Topographic Contours */
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

/* Mode 4: Angled Spotlight Beam */
.conic-beam {
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  width: 960px;
  height: 850px;
  background: conic-gradient(
    from 180deg at 50% 0%,
    transparent 0deg,
    rgba(var(--v-theme-primary), 0.16) 18deg,
    rgba(var(--v-theme-primary), 0.26) 26deg,
    rgba(var(--v-theme-primary), 0.16) 34deg,
    transparent 52deg
  );
  filter: blur(48px);
}

.beam-glow {
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 580px;
  height: 320px;
  border-radius: var(--radius-pill);
  background: radial-gradient(ellipse at center, rgba(var(--v-theme-primary), 0.2), transparent 70%);
  filter: blur(55px);
}

/* Mode 5: Drifting Aurora Mesh */
.aurora-orb {
  position: absolute;
  border-radius: var(--radius-pill);
  filter: blur(80px);
  opacity: 0.16;
}

.aurora-orb-1 {
  top: 5%;
  left: 20%;
  width: 600px;
  height: 450px;
  background: radial-gradient(circle, var(--color-primary), transparent 70%);
  animation: aurora-drift-1 18s infinite alternate ease-in-out;
}

.aurora-orb-2 {
  top: 40%;
  right: 15%;
  width: 520px;
  height: 400px;
  background: radial-gradient(circle, var(--color-secondary), transparent 70%);
  animation: aurora-drift-2 22s infinite alternate ease-in-out;
}

.aurora-orb-3 {
  bottom: 12%;
  left: 28%;
  width: 580px;
  height: 380px;
  background: radial-gradient(circle, var(--color-primary), transparent 70%);
  animation: aurora-drift-3 20s infinite alternate ease-in-out;
}

@keyframes aurora-drift-1 {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(50px, 35px) scale(1.08); }
}

@keyframes aurora-drift-2 {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(-45px, -50px) scale(1.06); }
}

@keyframes aurora-drift-3 {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(35px, -35px) scale(1.1); }
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
