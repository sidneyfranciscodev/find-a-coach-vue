import axios from "axios";

const api = axios.create({
  baseURL: 'https://find-a-coach-58332-default-rtdb.firebaseio.com',
  headers: {
    "Content-Type": "application/json"
  },
});

export default api;
