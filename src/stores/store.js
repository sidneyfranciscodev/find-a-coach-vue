import { defineStore } from 'pinia';
import api from '@/api/axios';

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
        console.log(response.data);
      } catch (error) {
        this.error = 'Failed to register as a coach.';
      };
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
    },

    async addRequest(payload) {
      const newRequest = {
        userEmail: payload.email,
        message: payload.message
      };
      try {
        const response = await api.post(`/requests/${payload.coachId}.json`, newRequest);

        if (response.data) {
          newRequest.id = response.name;
          newRequest.coachId = payload.coachId;
          console.log(this.success)
          console.log('[request sent]')
          console.log(response.data);
        } else {
          throw new Error(response.message || 'Failed to send request.')
        }
      } catch(error) {
        console.log(error)
        this.error = 'Failed to send request.';
      };
    },

    async fetchRequests() {
      const coachId = this.userId;

      try {
        const response = await api.get(`/requests/${coachId}.json`);

        if (response.data) {
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
        console.log(error)
        this.error = 'Failed to fetch requests. refresh the page!';
      }
    }
  },
});
