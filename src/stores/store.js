import { defineStore } from 'pinia';
import api from '@/api/axios';

const API_KEY = 'AIzaSyAyONm-cWUKyKsfYXlj41Dl45aXzeGq_GY';

export const useStore = defineStore('store', {
  state: () => ({
    userId: null,
    token: null,
    tokenExpire: null,
    isLoading : false,
    lastFetch: null,
    error: null,
    check: false,
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
    requests: [],
  }),

  getters: {
    hasCoaches: state => state.coaches && state.coaches.length > 0,
    isCoach: state => state.coaches.some(coach => coach.id === state.userId),
    newCoachId(state) {
      return 'c' + this.coaches.length + 1;
    },
    userRequests(state) {
      return state.requests.filter(req => req.coachId === state.userId)
    },
    hasRequests() {
      return this.userRequests && this.userRequests.length > 0
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
      const newId = this.newCoachId;
      const newCoach = {
        id: newId,
        firstName: data.firstName,
        lastName: data.lastName,
        description: data.description,
        hourlyRate: data.rate,
        areas: data.areas
      };

      try {
        const response = await api.put(`/coaches/${newCoach.id}.json`, newCoach);
        this.check = true;
        console.log(response.data);
      } catch (error) {
        this.error = 'Failed to register as a coach.';
        console.log(error);
      };
    },

    async fetchCoach() {
      this.isLoading = true;

      if (!this.shouldUpdate && this.coaches.length > 0) {
        this.isLoading = false;
        return;
      }

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
      this.isLoading = true;
      const coachId = this.userId;

      try {
        const response = await api.get(`/requests/${coachId}.json`);

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

    setFetchTimeStamp() {
      this.lastFetch = new Date().getTime();
    },

    async login(payload) {
      this.isLoading = true;
      try {
        const response = await api.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        });
        if (response.data) {
          this.userId = response.data.localId;
          this.token = response.data.idToken;
          this.tokenExpire = response.data.expiresIn;
          this.check = true;
          console.log(response.data);
        } else {
          throw new Error(response.message || 'Failed to login.')
        }
      } catch (error) {
        this.error = 'Failed to login.';
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },

    async signup(payload) {
      this.isLoading = true;
      try {
        const response = await api.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        });
        if (response.data) {
          this.check = true;
          console.log(response.data);
        } else {
          throw new Error(response.message || 'Failed to login.');
        }
      } catch (error) {
        this.error = 'Failed to login.';
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
