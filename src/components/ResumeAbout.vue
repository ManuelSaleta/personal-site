<script setup lang="ts">
import profileAvatar from "@/assets/avatar.jpeg";
import SocialMedia from "./ContactInfo.vue";
</script>

<template>
  <v-card class="m3-card hero-profile-card" variant="outlined" rounded="2xl">
    <div class="hero-body">
      <!-- Profile Picture Section -->
      <div class="avatar-column">
        <div class="avatar-ring">
          <img
            :src="profileAvatar"
            alt="Manuel Saleta - Profile picture"
            class="avatar-image"
            loading="eager"
          />
        </div>
        <v-chip
          size="small"
          color="success"
          variant="tonal"
          class="status-chip"
          prepend-icon="mdi-check-circle"
        >
          Open to Opportunities
        </v-chip>
      </div>

      <!-- Bio / Headline Section -->
      <div class="bio-column">
        <div class="headline-group">
          <h1 class="hero-title">Manuel Saleta</h1>
          <p class="hero-subtitle">Staff & Lead Software Engineer • Cloud & Distributed Systems</p>
        </div>

        <p class="hero-summary">
          <strong>I find solutions.</strong> A seasoned Full-Stack Engineer with close to a decade
          of experience designing and architecting high-throughput distributed systems, resilient
          microservices (.NET 10, ASP.NET Core, C#), and modern reactive frontends. Focused on
          portability and maintainability using Kubernetes (K3s), Docker, Terraform, and modular
          monolith principles.
        </p>

        <!-- Contact & Socials -->
        <div class="contact-section">
          <span class="contact-label">Get in touch</span>
          <SocialMedia />
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.hero-profile-card {
  padding: var(--space-6);
  width: 100%;
}

.hero-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
}

.avatar-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.avatar-ring {
  width: 150px;
  height: 150px;
  border-radius: var(--radius-pill);
  padding: 4px;
  background: linear-gradient(135deg, var(--color-primary), transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.15);
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-pill);
  object-fit: cover;
}

.status-chip {
  margin-top: var(--space-3);
  font-weight: 600;
  letter-spacing: 0.02em;
}

.bio-column {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  flex: 1;
}

.hero-title {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0;
  color: var(--color-text-main);
}

.hero-subtitle {
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--color-primary);
  margin-top: var(--space-1);
}

.hero-summary {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--color-text-main);
}

.contact-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-top: var(--space-2);
}

.contact-label {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
}
</style>
