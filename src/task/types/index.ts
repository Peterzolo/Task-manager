

import { Request } from 'express';

export interface ITask {
  id?:string;
  title?: string;
  description?:string;
  priority?:TaskPriority
  status?: TaskStatus;
  user?:string;
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



export class TaskResponseDto {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  timestamp: Date;
  user: string;
}


export interface IReadTask {
  id?:string;
  status:string;
  priority?:string;
}