<template>
  <base-dialog :show="!!store.error" title="An error occurred!" @close="handleError">
    <p>{{ store.error }}</p>
  </base-dialog>
  <section>
    <coach-filter @change-filter="setFilters" />
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoach">Refresh</base-button>
        <base-button v-if="!isCoach && !isLoading" link to="/register">Register as Coach</base-button>
      </div>
      <div v-if="store.isLoading">
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
</template>

<script setup>
import { useStore } from '@/stores/store.js';
import { computed, ref } from 'vue';

import CoachItem from '@/components/coaches/CoachItem.vue';
import CoachFilter from '@/components/coaches/CoachFilter.vue';

const store = useStore();

const  activeFilters = ref({
  frontend: true,
  backend: true,
  career: true,
});

const filteredCoaches = computed(() => {
  const coaches = store.coaches;
  return coaches.filter(coach => {
    if (activeFilters.value.frontend && coach.areas.includes('frontend')) {
      return true;
    }
    if (activeFilters.value.backend && coach.areas.includes('backend')) {
      return true;
    }
    if (activeFilters.value.career && coach.areas.includes('career')) {
      return true;
    }
    return false;
  });
});

const hasCoaches = computed(() => store.hasCoaches);
const isCoach = computed(() => store.isCoach);

const setFilters = updatedFilters => {
  activeFilters.value = updatedFilters;
}

const loadCoach = () => {
  store.fetchCoach();
}

const handleError = () => store.error = null;
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
