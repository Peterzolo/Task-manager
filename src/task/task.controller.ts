

import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthenticatedRequest } from 'src/auth/types';
import { AuthMiddleware } from 'src/helper/middleware';
import { CreateTaskDto } from './taskDto/task.dto';

@Controller('task')
@UseGuards(AuthMiddleware)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  async createTask(@Body() createTaskDto: CreateTaskDto, @Req() req: AuthenticatedRequest) {
    try {
      const user = req.id as string; 
      console.log("USER", user)
      const createdTask = await this.taskService.createTask(createTaskDto, user);
      return { success: true, task: createdTask };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}





