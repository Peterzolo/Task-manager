import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICreateTask } from './types';
import { Task } from './schema/task.model';

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
}
