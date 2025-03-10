export interface MemberInformation {
  id: number;
  email: string;
  name: string;
}

interface Credentials {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  memberInformation: MemberInformation;
  credentials: Credentials;
}

export interface SignupResponse {
  id: number;
  email: string;
  name: string;
}

export interface ReissueAccessTokenResponse {
  accessToken: string;
  refreshToken: string;
}
