// src/utils/authHelpers.js

// ✅ Get token from cookies (commented for now)
// export const getToken = () => {
//   const token = document.cookie
//     .split('; ')
//     .find((row) => row.startsWith('token='))
//     ?.split('=')[1];
//   return token || null;
// };

// ✅ Clear token (logout)
// export const clearToken = () => {
//   document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
// };

// ✅ Check if user is authenticated
// export const isAuthenticated = () => {
//   return !!getToken();
// };
