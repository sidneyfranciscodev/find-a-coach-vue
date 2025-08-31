import { defineStore } from 'pinia';
import { useAuthStore } from './auth';
import api from '@/api/axios';

export const useCoachesStore = defineStore('coaches', {
  state: () => ({
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
      },
    ],
    isLoading : false,
    lastFetch: null,
    error: null,
    check: false,
  }),

  getters: {
    hasCoaches: state => state.coaches && state.coaches.length > 0,
    isCoach(state) {
      const authStore = useAuthStore();
      return state.coaches.some(coach => coach.id === authStore.userId)
    },
    shouldUpdate(state) {
      if (!state.lastFetch) {
        return true;
      }
      const currentTimeStamp = new Date().getTime();
      return (currentTimeStamp - state.lastFetch) / 1000 > 60;
    },
  },

  actions: {
    async registerCoach(payload) {
      const authStore = useAuthStore();
      const newCoach = {
        coachId: authStore.userId,
        firstName: payload.firstName,
        lastName: payload.lastName,
        description: payload.description,
        hourlyRate: payload.rate,
        areas: payload.areas
      };

      try {
        const response = await api.put(`/coaches/${newCoach.coachId}.json?auth=${authStore.token}`, newCoach);
        this.check = true;
        console.log(response.data);
      } catch (error) {
        this.error = 'Failed to register as a coach.';
        console.log(error);
      };
    },

    async fetchCoaches() {
      const authStore = useAuthStore();
      this.isLoading = true;

      if (!this.shouldUpdate && this.coaches.length > 0) {
        this.isLoading = false;
        return;
      }

      try {
        const response = await api.get(`/coaches.json`);
        if (response.data) {
          const coachesData = response.data;
          console.log(response.data);
          for (const key in coachesData) {
            const coach = {
              id: key,
              firstName: coachesData[key].firstName,
              lastName: coachesData[key].lastName,
              description: coachesData[key].description,
              hourlyRate: coachesData[key].hourlyRate,
              areas: coachesData[key].areas
            };
            const existingCoachIndex = this.coaches.findIndex(c => c.id === key);
            if (existingCoachIndex !== -1) {
              this.coaches[existingCoachIndex] = coach;
            } else {
              this.coaches.push(coach);
            }
          }
        } else {
          throw new Error('Coaches not found');
        }
      } catch (error) {
        this.error = 'Failed to load coaches.';
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },

    setFetchTimeStamp() {
      this.lastFetch = new Date().getTime();
    },
  }
});
