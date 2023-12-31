import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from './token';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

export type DetailMessageType = {
  errorType: string;
  message: string;
  details: [Message];
}

type Message = {
  messages: [string];
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
  [StatusCodes.CONFLICT]: true,
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

const BASE_URL = 'https://13.design.pages.academy/six-cities';
const TIMEOUT = 5000;

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['X-Token'] = token;
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {

      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = (error.response.data);

        toast.warn(detailMessage.message);

        if (detailMessage.details[0].messages.length > 0) {
          detailMessage.details[0].messages.forEach((message) => toast.error(message));
        }
      }

      throw error;
    }
  );

  return api;
};
