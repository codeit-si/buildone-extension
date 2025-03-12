const PREFIX = `/api/v1`;

export const ENDPOINT = {
  AUTH: {
    LOGIN: `${PREFIX}/auth/login`,
    LOGOUT: `${PREFIX}/auth/logout`,
    SIGNUP: `${PREFIX}/auth/signup`,
    TOKEN_VALIDATION: `${PREFIX}/auth/token`,
  },
  GOAL: {
    GET_ALL: `${PREFIX}/goals`,
  },
  TODO: {
    CREATE: `${PREFIX}/todos`,
  },
};
