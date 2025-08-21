<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <span v-for="area in areas" :key="area">{{ area }}</span>
    </div>
    <div class="actions">
      <router-link :to="contactLink">Contact</router-link>
      <router-link :to="detailsLink">Details</router-link>
    </div>
  </li>
</template>

<script setup>
import { computed, route } from 'vue';

const props = defineProps(['id', 'firstName', 'lastName', 'rate', 'areas'])

const fullName = computed(() => props.firstName + '' + props.lastName);
const contactLink = computed(() => route.path + '/' + props.id + '/contact');
const detailsLink = computed(() => route.path + '/' + props.id);
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
