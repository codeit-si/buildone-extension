import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

import { ENDPOINT } from '../endpoint';

import type { ReissueAccessTokenResponse } from '@src/types/auth';

/** 기존 config에 Authorization 헤더 추가 */
export const getConfigWithAuthorizationHeaders = (config: InternalAxiosRequestConfig, token: string) => {
  const newConfig = { ...config };
  newConfig.headers.set('Authorization', `Bearer ${token}`);

  return newConfig;
};

/** accessToken 재발급 요청 */
export const reissueAccessToken = async (): Promise<string | null> => {
  try {
    const response = await axios.post<ReissueAccessTokenResponse>(ENDPOINT.AUTH.TOKEN_VALIDATION, null, {
      baseURL: process.env.CEB_SERVER_ADDRESS,
      withCredentials: true,
    });

    const token = response.data.accessToken;

    if (!token) {
      throw new Error('토큰이 응답에 포함되지 않았습니다.');
    }

    return token;
  } catch {
    return null;
  }
};

/** 새 토큰으로 요청 재시도 */
export const retryRequestWithNewToken = async (
  config: InternalAxiosRequestConfig,
  token: string,
  api: AxiosInstance,
) => {
  const newConfig = getConfigWithAuthorizationHeaders(config, token);
  return api(newConfig);
};
