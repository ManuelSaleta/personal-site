<template>
  <div class="poems-page-container">
    <header class="poems-header">
      <h1 class="poems-title">Slice of Life Poems</h1>
      <p class="poems-subtitle">Reflections, verses, and observations</p>
    </header>

    <div v-if="loading" class="loading-state">
      <v-progress-circular indeterminate color="primary" size="32" />
      <span class="loading-text">Loading poems...</span>
    </div>

    <div v-else class="poems-list">
      <v-card
        v-for="poem in poems"
        :key="poem.number"
        class="m3-card poem-card"
        variant="outlined"
        rounded="xl"
      >
        <v-card-title class="poem-title">
          <span class="poem-number">#{{ poem.number }}</span>
          <span>{{ poem.title }}</span>
        </v-card-title>
        <v-divider class="poem-divider" />
        <v-card-text class="poem-body">
          <pre class="poem-pre">{{ poem.body }}</pre>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script setup lang="ts">
// import { ENV } from "@/main";
import { ref, onMounted } from "vue";
import type { Poem } from "../common/interfaces";
import documentDb from "@/firebase";
import { collection, query, orderBy, getDocs, QuerySnapshot, limit } from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";
import { ENV } from "@/main";
import { poemFactory } from "@/common/mocks/factories";

// Explicitly type the ref as an array of Poems
const poems = ref<Poem[]>([]);
const loading = ref<boolean>(true);

onMounted(async () => {
  try {
    const poemCollection = collection(documentDb, "poems");
    //TODO: Get a random set of poems instead of the first 10, maybe using a random start point or a random selection method
    const q = query(poemCollection, orderBy("number", "asc"), limit(10)); // Limit to 10 poems for free version

    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    if (ENV.PROD) {
      // Map the data and cast it to our Poem interface
      poems.value = querySnapshot.docs.map((doc) => doc.data() as Poem);
    } else {
      //TODO: enable a seed.js for the firestore
      // Hack for local work:
      poems.value = poemFactory(20);
    }
  } catch (error) {
    console.error("Firestore Fetch Error:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.poems-page-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-4);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.poems-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.poems-title {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-text-main);
  margin: 0;
}

.poems-subtitle {
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-primary);
  margin-top: var(--space-1);
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-8) 0;
  color: var(--color-text-muted);
}

.loading-text {
  font-size: 0.95rem;
  letter-spacing: 0.02em;
}

.poems-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  width: 100%;
}

.poem-card {
  width: 100%;
}

.poem-card:hover {
  transform: translateY(-2px);
  border-color: rgba(var(--v-theme-primary), 0.4) !important;
  box-shadow: 0 10px 24px -4px rgba(0, 0, 0, 0.12);
}

.poem-title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  padding: var(--space-4) var(--space-5) var(--space-3);
}

.poem-number {
  color: var(--color-primary);
  font-size: 1rem;
  font-weight: 600;
  opacity: 0.85;
}

.poem-divider {
  margin: 0 var(--space-5);
  opacity: 0.15;
}

.poem-body {
  padding: var(--space-4) var(--space-5);
}

.poem-pre {
  font-family: inherit;
  white-space: pre-wrap;
  line-height: 1.75;
  font-size: 0.95rem;
  color: var(--color-text-main);
  margin: 0;
}
</style>
