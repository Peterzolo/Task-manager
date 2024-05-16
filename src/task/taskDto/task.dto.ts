

import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { TaskPriority, TaskStatus } from '../types'; 

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description?: string;

  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
