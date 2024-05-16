



import { ITask, TaskResponseDto } from "../types";

export class TaskResponsePresenter {
  static present(task: ITask): TaskResponseDto {
    const taskResponseDto: TaskResponseDto = {
      id: task.id,
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      timestamp: task.timestamp,
      user: task.user, 
    };

    return taskResponseDto;
  }
}
