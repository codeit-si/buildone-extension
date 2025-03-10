import type { AxiosResponse } from 'axios';
import { ENDPOINT } from '../endpoint';
import api from '@src/lib/axios';
import { useAuthStore } from '@src/store/auth-store';
import { useUserStore } from '@src/store/user-store';
import { storeAccessTokenInCookie } from './route-handler';
import type { LoginResponse } from '@src/types/auth';

export const login = async (email: string, password: string): Promise<AxiosResponse<LoginResponse>> => {
  const res = await api.post<LoginResponse>(ENDPOINT.AUTH.LOGIN, {
    email,
    password,
  });
  console.log(res);

  const { accessToken } = res.data.credentials;
  const { memberInformation } = res.data;

  useAuthStore.getState().setAccessToken(accessToken);
  useUserStore.getState().setUserInfo(memberInformation);

  await storeAccessTokenInCookie(accessToken);

  return res;
};
