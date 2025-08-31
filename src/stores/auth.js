import { defineStore } from 'pinia';
import api from '@/api/axios';

const API_KEY = 'AIzaSyAyONm-cWUKyKsfYXlj41Dl45aXzeGq_GY';
let timer;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: null,
    token: null,
    isLoading : false,
    error: null,
    check: false,
    didAutoLogout: false,
  }),

  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
  },

  actions: {
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

          const expirationTime = new Date().getTime() + Number(response.data.expiresIn) * 1000;

          localStorage.setItem('token', response.data.idToken);
          localStorage.setItem('userId', response.data.localId);
          localStorage.setItem('tokenExpiration', expirationTime);

          timer = setTimeout(() => {
            this.autoLogout();
          }, Number(response.data.expiresIn) * 1000);

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

    async auth(payload) {
      if (payload.mode === 'login') {
        await this.login({
          email: payload.email,
          password: payload.password,
        });
      } else {
        await this.signup({
          email: payload.email,
          password: payload.password,
        });
      }

    },

    autoLogin() {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const tokenExpiration = localStorage.getItem('tokenExpiration');
      const expiresIn = Number(tokenExpiration) - new Date().getTime();

      if (expiresIn < 0) {
        return;
      }

      timer = setTimeout(() => {
        this.autoLogout();
      }, expiresIn);

      if (token && userId) {
        this.token = token;
        this.userId = userId;
      }
    },

    autoLogout() {
      this.logout();
      this.didAutoLogout = true;
    },

    logout() {
      this.userId = null;
      this.token = null;
      this.tokenExpire = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('tokenExpiration');
      clearTimeout(timer);
    }
  },
});
