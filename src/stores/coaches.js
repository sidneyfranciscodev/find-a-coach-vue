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
    async registerCoach(data) {
      const authStore = useAuthStore();
      const newCoach = {
        id: this.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        description: data.description,
        hourlyRate: data.rate,
        areas: data.areas
      };

      try {
        const response = await api.post(`/coaches/${newCoach.id}.json?auth=${authStore.token}`, newCoach);
        this.check = true;
        console.log(response.data);
      } catch (error) {
        this.error = 'Failed to register as a coach.';
        console.log(error);
      };
    },

    async fetchCoach() {
      const authStore = useAuthStore();
      this.isLoading = true;

      if (!this.shouldUpdate && this.coaches.length > 0) {
        this.isLoading = false;
        return;
      }

      try {
        const response = await api.get(`/coaches/${authStore.userId}.json`);
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
          console.log(response.data);
          // Update existing coach or add new one
          const existingIndex = this.coaches.findIndex(coach => coach.id === authStore.userId);
          if (existingIndex !== -1) {
            this.coaches[existingIndex] = fetchedCoach;
          } else {
            this.coaches.push(fetchedCoach);
            this.setFetchTimeStamp();
          }
        } else {
          throw new Error('Coach not found');
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
