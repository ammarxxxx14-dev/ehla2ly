import { create } from 'zustand';
import { User } from '../lib/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  needsRoleSelection: boolean;
  login: (phone: string) => void;
  verifyOtp: (otp: string) => Promise<boolean>;
  setRole: (role: 'customer' | 'barber' | 'shop_owner') => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  needsRoleSelection: false,
  login: (phone) => {
    set({ isLoading: true });
    // Mocking OTP send
    setTimeout(() => {
      set({ 
        user: { id: 'temp', name: '', phone, role: 'customer' }, 
        isLoading: false 
      });
    }, 1000);
  },
  verifyOtp: async (otp) => {
    set({ isLoading: true });
    // Mocking verification
    return new Promise((resolve) => {
      setTimeout(() => {
        set({ 
          isAuthenticated: true, 
          needsRoleSelection: true,
          isLoading: false 
        });
        resolve(true);
      }, 1000);
    });
  },
  setRole: (role) => {
    set((state) => ({
      user: state.user ? { ...state.user, role } : null,
      needsRoleSelection: false,
    }));
  },
  logout: () => {
    set({ user: null, isAuthenticated: false, needsRoleSelection: false });
  },
}));
