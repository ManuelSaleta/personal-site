<script setup lang="ts">
import resumePdf from "@/assets/manuel_saleta_resume.pdf";
</script>

<template>
  <v-btn
    :href="resumePdf"
    download="Manuel_Saleta_Resume.pdf"
    target="_blank"
    color="primary"
    variant="tonal"
    prepend-icon="mdi-download"
    class="download-btn"
    rounded="lg"
  >
    Download Full Resume (.PDF)
  </v-btn>
</template>

<style scoped>
.download-btn {
  font-weight: 500;
  letter-spacing: 0.02em;
}
</style>
