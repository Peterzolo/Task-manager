import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './helper/jwt.config';
import { AuthMiddleware } from './helper/middleware';
import { TaskModule } from './task/task.module';
import { MyWebSocketGateway } from './helper/socket.gateway';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    JwtModule.register(jwtConfig),
    AuthModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService,MyWebSocketGateway],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude(
      { path: '/auth/signup', method: RequestMethod.POST }, 
      { path: '/auth/signin', method: RequestMethod.POST },

    )
      
    .forRoutes('*'); 
  }
}
