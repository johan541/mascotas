import axios, { AxiosResponse } from 'axios';

type APIError = {
  message: string;
};

export function withAxiosHandler<T extends object, Args extends unknown[]>(
  callback: (...args: Args) => Promise<AxiosResponse<T, unknown>>
): (...args: Args) => Promise<T> {
  return async function (...args) {
    try {
      const response = await callback(...args);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError<APIError>(error) && error.response) {
        throw new Error(error.response.data.message);
      }

      throw error;
    }
  };
}
