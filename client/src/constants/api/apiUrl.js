
import axios from "axios";
export const BASE_URL = 'http://localhost:9090';

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user);
console.log(currentUser);
const TOKEN = currentUser?.user?.access_token;
console.log(TOKEN);
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});
