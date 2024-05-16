

import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
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


export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
