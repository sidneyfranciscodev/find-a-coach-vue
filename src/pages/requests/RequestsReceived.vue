<template>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <ul v-if="hasRequests">
        <request-item v-for="req in userRequests" :key="req.id" :email="req.userEmail" :message="req.message">
        </request-item>
      </ul>
      <h3 v-else>You haven't received any requests yet</h3>
    </base-card>
  </section>
</template>

<script setup>
import { useStore } from "@/stores/store";
import { computed } from "vue";
import RequestItem from "@/components/requests/RequestItem.vue";

const store = useStore();

const userRequests = computed(() => store.userRequests);
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
