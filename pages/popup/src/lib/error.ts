import { AxiosError } from 'axios';

export interface ErrorResponse {
  code: string;
  message: string;
}

export class ApiError extends Error {
  code: string;

  constructor(error: unknown) {
    if (error instanceof AxiosError) {
      const errorResponse: ErrorResponse = error.response?.data ?? {
        code: 'UNKNOWN_ERROR',
        message: '알 수 없는 에러가 발생했습니다.',
      };

      super(errorResponse.message);
      this.code = errorResponse.code;
    } else {
      super('네트워크 오류가 발생했습니다.');
      this.code = 'NETWORK_ERROR';
    }

    this.name = 'ApiError';
  }
}
