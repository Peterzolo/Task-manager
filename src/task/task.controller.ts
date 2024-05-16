

import { Controller, Post, Body, UseGuards, Req, Get, Param, Put, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthenticatedRequest } from 'src/auth/types';
import { AuthMiddleware } from 'src/helper/middleware';
import { CreateTaskDto, UpdateTaskDto } from './taskDto/task.dto';
import { TaskResponseDto } from './types';
import { TaskResponsePresenter } from './presenter/task.presenter';

@Controller('task')
@UseGuards(AuthMiddleware)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  async createTask(@Body() createTaskDto: CreateTaskDto, @Req() req: AuthenticatedRequest) {
    try {
      const user = req.id as string; 
      console.log("USER YYY", user)
      const createdTask = await this.taskService.createTask(createTaskDto, user);
      return { success: true, task: createdTask };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }


  @Get()
  async getAllTasks(): Promise<TaskResponseDto[]> {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<TaskResponseDto | null> {
    return this.taskService.getTaskById(id);
  }



  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: AuthenticatedRequest
  ): Promise<TaskResponseDto> {
    const user = req.id as string; 
    console.log("USER", user)
    const updatedTask = await this.taskService.updateTask(id, updateTaskDto, user);
    return TaskResponsePresenter.present(updatedTask);
  }


  @Delete(':id')
  async deleteTask(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest
  ): Promise<void> {
    const user = req.id as string; 
    await this.taskService.deleteTask(id, user);
  }
}





