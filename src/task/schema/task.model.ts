


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ITask,TaskPriority, TaskStatus  } from '../types';


@Schema()
export class Task implements ITask {

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ enum: TaskPriority, default: TaskPriority.LOW })
  priority: TaskPriority;

  @Prop({ enum: TaskStatus, default: TaskStatus.TODO })
  status: TaskStatus;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: 'ObjectId', ref: 'Auth'})
  user: string; 

  @Prop({ default: Date.now })
  timestamp?: Date;
}


export type TaskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);

TaskSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id; 
    delete ret._id; 
    delete ret.__v; 
    return ret;
  },
});


