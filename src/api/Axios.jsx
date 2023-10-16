import axios from 'axios';

export const baseAxios = axios.create({
  baseURL: 'https://find-my-guide.site/api/',
  // baseURL: '',
  headers: {
    'Content-Type': 'application/json'
    // Authorization: sessionStorage.getItem("token"),
  }
});
