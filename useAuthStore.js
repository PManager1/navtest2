// useAuthStore.js
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isLoggedIn: false,
  login: () => {
    console.log('✅ login() called — setting isLoggedIn: true');
    set({ isLoggedIn: true });
  },
  logout: () => {
    console.log('🔒 logout() called — setting isLoggedIn: false');
    set({ isLoggedIn: false });
  },
}));