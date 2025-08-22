import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
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
      }
    ],
  }),

  getters: {
    allCoaches: state => state.coaches,
    hasCoaches: state => state.coaches && state.coaches.length > 0,
  },

  actions: {
    registerCoach(data) {
      const id = this.coaches.length + 1
      const newCoach = {
        id: 'c' + id,
        firstName: data.first,
        lastName: data.last,
        description: data.desc,
        hourlyRate: data.rate,
        areas: data.areas
      };
      this.coaches.push(newCoach);
    }
  },
});
