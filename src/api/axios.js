import axios from "axios";

const api = axios.create({
  baseURL: '/.com',
  headers: {
    "Content-Type": "application/json"
  },
});

export default api;
