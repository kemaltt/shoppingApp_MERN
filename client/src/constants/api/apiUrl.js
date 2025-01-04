import { fetchBaseQuery } from "@reduxjs/toolkit/query";

// Desc: API URL
export const BASE_URL = process.env.REACT_APP_API_PATH === "production" ? 'https://shoppingapp-mern.onrender.com' : 'http://localhost:9090'
// export const BASE_URL = process.env.REACT_APP_API_PATH === "production" ? 'https://shopping-app-mern-indol.vercel.app' : 'http://localhost:9090'

 const getToken = () => {
  // `persist:user`'i localStorage'den al
  const persistUser = localStorage.getItem('persist:user');
  
  if (persistUser) {
    // JSON stringini parse et
    const userObj = JSON.parse(persistUser);
    
    // Token bilgisini al
    const token = JSON.parse(userObj.token); // Burada token JSON string olduğu için parse ettik
    return token;
  }
  return null; // Token yoksa null döndür
};


export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = getToken(); // Token'ı alın
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});