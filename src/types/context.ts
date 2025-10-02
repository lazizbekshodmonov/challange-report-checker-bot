import type { SessionData } from './session.js';
import type { Context, SessionFlavor } from 'grammy';
import type { AxiosInstance } from 'axios';

type ApiClient = {
  apiClient: AxiosInstance;
};

export type CustomContext = Context & SessionFlavor<SessionData> & ApiClient;
