<template>
  <div class="container mx-auto px-4 py-8 flex flex-col items-center">
    <h1 class="text-3xl font-bold mb-6">Slice of Life Poems</h1>
    <div v-if="loading" class="text-center text-gray-500">Loading poems...</div>
    <div v-else class="space-y-8">
      <!-- {{  ENV }} -->
      <div v-for="poem in poems" :key="poem.number" class="mb-6 w-2xl">
        <!-- <h2 class="text-xl font-semibold mb-2">{{ poem.title }}</h2>
        <pre class="whitespace-pre-wrap text-gray-700">{{ poem.body }}</pre> -->
        <v-card>
          <v-card-title>{{ poem.number }}. {{ poem.title }}</v-card-title>
          <v-card-text>{{ poem.body }}</v-card-text>
        </v-card>
      </div>
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
