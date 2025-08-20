<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <span v-for="area in areas" :key="area">{{ area }}</span>
    </div>
    <div class="actions">
      <router-link to="/coaches/c1/contact">Contact</router-link>
      <router-link to="/coaches/c1">Details</router-link>
    </div>
  </li>
</template>

<script setup>
import { useStore } from '@/stores/strore.js';

defineProps(['fullName', 'rate', 'areas'])
const store = useStore();
</script>


<style lang="scss" scoped>
li {
  h3 {
    font-size: 1.5rem;
  }

  h3,
  h4,
  div {
    margin: 0.5rem 0;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
