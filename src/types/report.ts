import type { IUser } from './user.js';
import type { ITopic } from './topic.js';

export interface IReport {
  id: number;
  content: number;
  createdAt: string;
  user: IUser;
  userId: number;
  topic: ITopic;
  topicId: number;
}
