import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schema/task.model';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/helper/jwt.config';
import { MyWebSocketGateway } from 'src/helper/socket.gateway';

@Module({
    imports:[ MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    JwtModule.register(jwtConfig), 
  ],
  providers: [TaskService,MyWebSocketGateway],
  controllers: [TaskController]
})
export class TaskModule {}
