
// src/task/exceptions/task-not-found.exception.ts

import { NotFoundException } from '@nestjs/common';

export class TaskNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super(message || 'No tasks found');
  }
}
