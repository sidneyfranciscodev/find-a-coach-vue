<template>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <ul v-if="hasRequests">
        <li></li>
      </ul>
      <h3 v-else>You haven't received any requests yet</h3>
    </base-card>
  </section>
</template>

<script setup>
import { useStore } from "@/stores/store";
import { computed } from "vue";

const store = useStore();

const receivedRequests = computed(() => store.requests);
const hasRequests = computed(() => store.hasRequests);
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
