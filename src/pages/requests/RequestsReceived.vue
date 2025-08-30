<template>
  <div>
    <base-dialog :show="!!requestsStore.error" title="An error occurred!" @close="handleError">
      <p>{{ requestsStore.error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
          <base-button mode="outline" @click="loadRequests">Refresh</base-button>
        </header>
        <div v-if="requestsStore.isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasRequests && !requestsStore.isLoading">
          <request-item v-for="req in userRequests" :key="req.id" :email="req.email" :message="req.message">
          </request-item>
        </ul>
        <h3 v-else>You haven't received any requests yet</h3>
      </base-card>
    </section>
  </div>
</template>

<script setup>
import { useRequestsStore } from "@/stores/requests.js";
import { computed } from "vue";
import RequestItem from "@/components/requests/RequestItem.vue";

const requestsStore = useRequestsStore();

const userRequests = computed(() => requestsStore.userRequests);
const hasRequests = computed(() => requestsStore.hasRequests);

const loadRequests = () => {
  requestsStore.fetchRequests();
}
requestsStore.fetchRequests();

const handleError = () => requestsStore.error = null;
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
