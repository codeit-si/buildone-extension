import axios from 'axios';
import { ENDPOINT } from '../endpoint';

/** accessToken 쿠키 저장 API  */
export const storeAccessTokenInCookie = async (token: string) => {
  const res = await axios.post(ENDPOINT.AUTH.LOGIN, {
    accessToken: token,
  });

  return res;
};
