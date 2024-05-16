

import { Request } from 'express';

export interface ITask {
  title: string;
  description:string;
  priority:TaskPriority
  status: TaskStatus;
  timestamp?: Date;
}

export interface ICreateTask {
  title: string;
  description?:string;
  priority?:TaskPriority
  status?: TaskStatus;
  user?: string;
  timestamp?: Date;
}

export enum TaskPriority {
  LOW ="LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}
export enum TaskStatus {
  TODO ="TODO",
  IM_PROGRESS = "IM_PROGRESS",
  DEV_REVIEW = "DEV_REVIEW",
  COMPLETED = "COMPLETED",
}