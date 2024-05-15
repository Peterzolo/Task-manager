

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth ,AuthSchema} from './schema/auth.model';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/helper/jwt.config';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]), 
    JwtModule.register(jwtConfig), 
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
