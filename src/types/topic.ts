import type { IReport } from './report.js';

export interface ITopic {
  id: number;
  title: string;
  createdAt: string;
  reports: IReport[];
}
