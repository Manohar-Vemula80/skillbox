// src/utils/api.js

// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api', // 🔁 Update when backend is ready
//   withCredentials: true,
// });

// // ✅ Add token to header if needed
// api.interceptors.request.use((config) => {
//   const token = document.cookie
//     .split('; ')
//     .find((row) => row.startsWith('token='))
//     ?.split('=')[1];
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;
import axios from 'axios';

export const fetchCourses = async () => {
  const res = await axios.get('https://skillbox-e0tj.onrender.com/api/courses');
  return res.data;
};