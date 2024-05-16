import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICreateTask, ITask, IUpdateTask, TaskResponseDto } from './types';
import { Task } from './schema/task.model';
import { TaskNotFoundException } from 'src/helper/error';
import { TaskResponsePresenter } from './presenter/task.presenter';
import { MyWebSocketGateway } from 'src/helper/socket.gateway';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>,
    private readonly webSocketGateway: MyWebSocketGateway,
  ) {}

  async createTask(createTaskDto: ICreateTask, userId: string): Promise<Task> {
    const createdTask = new this.taskModel({
      ...createTaskDto,
      user: userId,
    });
    const savedTask = await createdTask.save();

    // Here, we are emiting the websocket event to notify the connected users about the new  task.
    this.webSocketGateway.server.emit('taskCreated', savedTask);

    return savedTask;
    
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
    await task.save();
    this.webSocketGateway.server.emit('taskUpdates', { action: 'update', task });
    return task;
  }


  async deleteTask(id: string, userId: string): Promise<void> {
    const task = await this.taskModel.findByIdAndDelete(id).exec();
    if (!task) {
      throw new TaskNotFoundException(`Task with id ${id} not found`);
    }
    if (task.user.toString() !== userId) {
      throw new TaskNotFoundException('You are not authorized to delete this task');
    }
    this.webSocketGateway.server.emit('taskUpdates', { action: 'delete', taskId: id });
  }
  

}
