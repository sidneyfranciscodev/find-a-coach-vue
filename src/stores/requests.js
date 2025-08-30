import { defineStore } from 'pinia';
import { useAuthStore } from '@/stores/auth.js';
import api from '@/api/axios';


export const useRequestsStore = defineStore('requests', {
  state: () => ({
    requests: [],
    isLoading : false,
    error: null,
    check: false,
  }),

  getters: {
    userRequests(state) {
      const authStore = useAuthStore();
      return state.requests.filter(req => req.coachId === authStore.userId)
    },
    hasRequests() {
      return this.userRequests && this.userRequests.length > 0
    },
  },

  actions: {
    async addRequest(payload) {
      const newRequest = {
        userEmail: payload.email,
        message: payload.message
      };
      try {
        const response = await api.post(`/requests/${payload.coachId}.json`, newRequest);

        if (response.data) {
          this.check = true,
          newRequest.id = response.name;
          newRequest.coachId = payload.coachId;
          console.log('[request sent]')
          console.log(response.data);
        } else {
          throw new Error(response.message || 'Failed to send request.')
        }
      } catch(error) {
        this.error = 'Failed to send request.';
        console.log(error);
      };
    },

    async fetchRequests() {
      const authStore = useAuthStore();
      this.isLoading = true;
      const coachId = authStore.userId;

      try {
        const response = await api.get(`/requests/${coachId}.json?auth=${authStore.token}`);

        if (response.data) {
          this.requests = [];
          for (const key in response.data) {
            const request = {
              id: key,
              coachId: coachId,
              email: response.data[key].userEmail,
              message: response.data[key].message
            };
            this.requests.push(request);
          }
          console.log(response.data);
        }
      } catch(error) {
        this.error = 'Failed to fetch requests. refresh the page!';
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  }
})
