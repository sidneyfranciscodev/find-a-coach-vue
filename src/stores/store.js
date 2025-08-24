import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import api from '@/api/axios';

const router = useRouter();

export const useStore = defineStore('store', {
  state: () => ({
    userId: 'c3', // This is just for testing purposes
    error: null,
    coaches: [
      {
        id: 'c1',
        firstName: 'Max',
        lastName: 'Mad',
        areas: ['frontend', 'backend'],
        description: "I'm Max and I've worked as a freelance web developer for years.",
        hourlyRate: 30,
      },
      {
        id: 'c2',
        firstName: 'Julie',
        lastName: 'Jone',
        areas: ['frontend', 'career'],
        description: "I'm Julie I am a senior developer in a big company.",
        hourlyRate: 30,
      }
    ],
    requests: [],
  }),

  getters: {
    hasCoaches: state => state.coaches && state.coaches.length > 0,
    isCoach: state => state.coaches.some(coach => coach.id === state.userId),
    userRequests(state) {
      return state.requests.filter(req => req.coachId === state.userId)
    },
    hasRequests() {
      return this.userRequests && this.userRequests.length > 0
    },
  },

  actions: {
    async registerCoach(data) {
      const newCoach = {
        id: this.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        description: data.description,
        hourlyRate: data.rate,
        areas: data.areas
      };

      try {
        const response = await api.put(`/coaches/${newCoach.id}.json`, newCoach);
        router.replace('/coaches');
        console.log(response.data);
      } catch (error) {
        this.error = 'Failed to register as a coach.';
      };
    },

    addRequest(requestData) {
      const newRequest = {
        id: new Date().toISOString(),
        coachId: requestData.coachId,
        userEmail: requestData.email,
        message: requestData.message
      };
      this.requests.push(newRequest);
    },

    async fetchCoach() {
      try {
        const response = await api.get(`/coaches/${this.userId}.json`);
        if (response.data) {
          const coachData = response.data;
          const fetchedCoach = {
            id: coachData.id,
            firstName: coachData.firstName,
            lastName: coachData.lastName,
            description: coachData.description,
            hourlyRate: coachData.hourlyRate,
            areas: coachData.areas
          };
          const existingIndex = this.coaches.findIndex(coach => coach.id === this.userId);
          if (existingIndex !== -1) {
            this.coaches[existingIndex] = fetchedCoach;
          } else {
            this.coaches.push(fetchedCoach);
          }
        } else {
          throw new Error('Coach not found');
          this.error = 'Coach not found.';
        }
      } catch (error) {
        this.error = 'Failed to load coaches.';
      }
    }
  },
});
