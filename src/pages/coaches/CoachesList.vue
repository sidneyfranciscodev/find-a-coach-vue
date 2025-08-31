<template>
  <div>
    <base-dialog :show="!!coachesStore.error" title="An error occurred!" @close="handleError">
      <p>{{ coachesStore.error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters" />
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
          <base-button v-if="!authStore.isLoggedIn" to="/auth" link>Login</base-button>
          <base-button v-if="authStore.isLoggedIn && !isCoach && !coachesStore.isLoading" link to="/register">Register as Coach</base-button>
        </div>
        <div v-if="coachesStore.isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item v-for="coach in filteredCoaches" :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :areas="coach.areas"
          :rate="coach.hourlyRate"
          ></coach-item>
        </ul>
        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script setup>
import { useCoachesStore } from '@/stores/coaches.js';
import { useAuthStore } from '@/stores/auth.js';
import { computed, reactive } from 'vue';

import CoachItem from '@/components/coaches/CoachItem.vue';
import CoachFilter from '@/components/coaches/CoachFilter.vue';

const coachesStore = useCoachesStore();
const authStore = useAuthStore();

const  activeFilters = reactive({
  frontend: true,
  backend: true,
  career: true,
});

const filteredCoaches = computed(() => {
  const coaches = coachesStore.coaches;
  return coaches.filter(coach => {
    if (activeFilters.frontend && coach.areas.includes('frontend')) {
      return true;
    }
    if (activeFilters.backend && coach.areas.includes('backend')) {
      return true;
    }
    if (activeFilters.career && coach.areas.includes('career')) {
      return true;
    }
    return false;
  });
});

const hasCoaches = computed(() => coachesStore.hasCoaches);
const isCoach = computed(() => coachesStore.isCoach);

const setFilters = updatedFilters => Object.assign(activeFilters, updatedFilters);

const loadCoaches = () => {
  coachesStore.fetchCoaches();
}

coachesStore.fetchCoaches();

const handleError = () => coachesStore.error = null;
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  justify-content: space-between;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
