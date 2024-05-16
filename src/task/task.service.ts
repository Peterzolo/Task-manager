import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICreateTask, ITask, IUpdateTask, TaskResponseDto } from './types';
import { Task } from './schema/task.model';
import { TaskNotFoundException } from 'src/helper/error';
import { TaskResponsePresenter } from './presenter/task.presenter';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>,
  ) {}

  async createTask(createTaskDto: ICreateTask, userId: string): Promise<Task> {
    const createdTask = new this.taskModel({
      ...createTaskDto,
      user: userId,
    });
    return await createdTask.save();
  }


  async getAllTasks(): Promise<TaskResponseDto[]> {
    const tasks = await this.taskModel.find().exec();
    if(!tasks.length){
      throw new TaskNotFoundException( "Task not available")
    }
    return tasks.map(task => TaskResponsePresenter.present(task));
  }

  async getTaskById(id: string): Promise<TaskResponseDto | null> {
    const task = await this.taskModel.findById(id).exec();
    if(!task){
      throw new TaskNotFoundException( `Task with id ${id} not found`)
    }
    return TaskResponsePresenter.present(task);
  }



  async updateTask(id: string, updateTaskDto: IUpdateTask, userId: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();

    if (!task) {
      throw new TaskNotFoundException('Task not found');
    }
    if (task.user.toString() !== userId) {
      throw new TaskNotFoundException( `Sorry, but you are not authorized to update this task`)
    }
    Object.assign(task, updateTaskDto);
    return await task.save();
  }


  async deleteTask(id: string, userId: string): Promise<void> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new TaskNotFoundException( `Task with id ${id} not found`)
    }
    if (task.user.toString() !== userId) {
      throw new TaskNotFoundException('You do not have permission to delete this task');
    }
    await this.taskModel.findByIdAndDelete(id).exec();
  }

  

}
