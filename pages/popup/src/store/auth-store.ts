import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;

  setAccessToken: (token: string) => void;
  removeAccessToken: () => void;
}

const initialState = {
  accessToken: null,
};

export const useAuthStore = create<AuthState>()(set => ({
  ...initialState,

  setAccessToken: (token: string) => set({ accessToken: token }),
  removeAccessToken: () => set(initialState),
}));
