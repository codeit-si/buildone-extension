import type { MemberInformation } from '@src/services/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  userInformation: MemberInformation | null;

  setUserInfo: (userInfo: MemberInformation) => void;
  removeUserInfo: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      userInformation: null,

      setUserInfo: ({ id, email, name }: MemberInformation) => set({ userInformation: { id, email, name } }),
      removeUserInfo: () => set({ userInformation: null }),
    }),
    {
      name: 'user-information',
    },
  ),
);
