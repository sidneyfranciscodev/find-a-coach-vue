<template>
  <base-dialog :show="!!store.error" title="An error occurred!" @close="handleError">
    <p>{{ store.error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
        <base-button mode="outline" @click="loadRequests">Refresh</base-button>
      </header>
      <div v-if="isLoading">
        <base-spinner></base-spinner>>
      </div>
      <ul v-else-if="hasRequests && !isLoading">
        <request-item v-for="req in userRequests" :key="req.id" :email="req.userEmail" :message="req.message">
        </request-item>
      </ul>
      <h3 v-else>You haven't received any requests yet</h3>
    </base-card>
  </section>
</template>

<script setup>
import { useStore } from "@/stores/store";
import { computed, ref } from "vue";
import RequestItem from "@/components/requests/RequestItem.vue";

const store = useStore();
const isLoading = ref(false)

const userRequests = computed(() => store.userRequests);
const hasRequests = computed(() => store.hasRequests);

const loadRequests = () => {
  isLoading.value = true;
  store.fetchRequests();
  isLoading.value = false;
}

const handleError = () => store.error = null;
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
