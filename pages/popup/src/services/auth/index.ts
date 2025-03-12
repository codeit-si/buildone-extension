import type { AxiosResponse } from 'axios';
import { ENDPOINT } from '../endpoint';
import api from '@src/lib/axios';
import { useUserStore } from '@src/store/user-store';
import type { LoginResponse } from '@src/types/auth';

export const login = async (email: string, password: string): Promise<AxiosResponse<LoginResponse>> => {
  const res = await api.post<LoginResponse>(ENDPOINT.AUTH.LOGIN, {
    email,
    password,
  });
  console.log(res);

  const { memberInformation } = res.data;

  useUserStore.getState().setUserInfo(memberInformation);

  return res;
};
