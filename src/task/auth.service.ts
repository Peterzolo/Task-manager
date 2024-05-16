import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthenticationDto, SignUpDto } from './taskDto/task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth,AuthDocument} from './schema/task.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>,
  private jwtService: JwtService,
) {}

  async signUp(signUpDto: SignUpDto): Promise<Auth> {
    const { email, password,name,phone } = signUpDto;

  
    const existingUser = await this.authModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = new this.authModel({
      email,
      name,
      phone,
      password: hashedPassword,
      timestamp: new Date(),
    });

    return createdUser.save();
  }

 
  async signIn(authenticationDto: AuthenticationDto): Promise<string> {
    const { email, password } = authenticationDto;

    const user = await this.authModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id };
    return this.jwtService.sign(payload);
  }

}


