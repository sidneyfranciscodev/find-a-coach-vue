<template>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>{{ rate }}/hour</h3>
    </base-card>
  </section>
  <section>
    <base-card>
      <header>
        <h2>Interested? Reach out now!</h2>
        <base-button link :to="contactLnk">Contact</base-button>
      </header>
      <router-view></router-view>
    </base-card>
  </section>
  <section>
    <base-card>
      <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
      <p>{{ description }}</p>
    </base-card>
  </section>
</template>

<script setup>
import { useStore } from '@/stores/store';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const store = useStore();
const route = useRoute();

const props = defineProps(['id']);
const selectedCoach = computed(() => store.allCoaches.find(coach => coach.id === props.id));

const fullName = computed(() => selectedCoach.value ? selectedCoach.value.firstName + ' ' + selectedCoach.value.lastName : '');
const contactLnk = computed(() => route.path +  '/contact');
const areas = computed(() => selectedCoach.value ? selectedCoach.value.areas : []);
const description = computed(() => selectedCoach.value ? selectedCoach.value.description : '')
const rate = computed(() => selectedCoach.value ? selectedCoach.value.hourlyRate : '')
</script>
