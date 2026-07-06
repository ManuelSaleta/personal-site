<template>
  <v-app-bar
    color="#000000"
    scroll-behavior="fade-image"
    image="/src/assets/banner.png"
    loading="lazy"
  >
    <v-app-bar-nav-icon @click="drawer = !drawer" />
    <v-icon icon="/src/assets/cpu.svg"></v-icon>
    <v-app-bar-title>
      Manuel Saleta |
      <!-- TODO: figure out the divider -->
      <!-- <v-divider class="p-1" thickness="4" color="white" opacity="100" vertical/> -->
      Lets build something great
    </v-app-bar-title>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
      <v-list-item v-for="link in links" :key="link.to" :to="link.to" link>
        {{ link.label }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";

const drawer = ref(false);

const links = [
  { label: "Home", to: "/" },
  // { label: "About me", to: "/AboutMe" },
  // { label: "Books", to: "/BooksPage" },
  // { label: "Poems", to: "/PoemsPage" },
  // Add more pages here
];
</script>

<style scoped>
/* Add optional styling overrides here */
</style>
