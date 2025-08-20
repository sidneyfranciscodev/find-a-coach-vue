<template>
  <section>FILTER</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="/register">Register as Coach</router-link>
    </div>
    <ul v-if="hasCoaches">
      <li v-for="coach in filteredCoaches" :key="coach.id">{{ coach.firstName }}</li>
    </ul>
    <h3 v-else>No coaches found.</h3>
  </section>
</template>

<script setup>
import { useStore } from '@/stores/store.js';
import { computed } from 'vue'

const store = useStore();
const filteredCoaches = computed(() => store.allCoaches);
const hasCoaches = computed(() => store.hasCoaches);
</script>

<style scoped>
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
