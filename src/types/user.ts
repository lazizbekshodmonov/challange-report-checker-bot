import type { IReport } from './report.js';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IUser {
  id: number;
  chat_id: bigint;
  username: string | null;
  first_name: string;
  last_name: string | null;
  role: UserRole;
  joined_at: Date;
  missed_count: number;
  reports?: IReport[];
}

export interface ICreateUser {
  chat_id: number;
  username: string | null;
  first_name: string;
  last_name: string | null;
  is_chat_member: boolean;
  role: UserRole;
  joined_at: Date;
  missed_count: number;
}

export interface ITelegramUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name: string | null;
  username: string | null;
  language_code: string | null;
}
