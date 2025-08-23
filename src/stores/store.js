import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
  state: () => ({
    userId: 'c3', // This is just for testing purposes
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
    registerCoach(data) {
      //const id = this.coaches.length + 1
      const newCoach = {
        id: this.userId,//'c' + id,
        firstName: data.first,
        lastName: data.last,
        description: data.desc,
        hourlyRate: data.rate,
        areas: data.areas
      };
      this.coaches.push(newCoach);
    },

    addRequest(requestData) {
      const newRequest = {
        id: new Date().toISOString(),
        coachId: requestData.coachId,
        userEmail: requestData.email,
        message: requestData.message
      };
      this.requests.push(newRequest);
    }
  },
});
