import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './authDto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth,AuthDocument} from './schema/auth.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>,
  private jwtService: JwtService,
) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<Auth> {
    const { email, password } = authCredentialsDto;

  
    const existingUser = await this.authModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = new this.authModel({
      email,
      password: hashedPassword,
      timestamp: new Date(),
    });

    return createdUser.save();
  }

  async signIn(authCredentialsDto: AuthCredentialsDto, response: any): Promise<void> {
    const { email, password } = authCredentialsDto;

    const user = await this.authModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id }; 
    const token = this.jwtService.sign(payload); 

 
    this.setTokenCookie(response, token);
  }


  private setTokenCookie(response: any, token: string): void {
    
    response.cookie('jwt', token, {
      httpOnly: true, 
      maxAge: 3600000, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict', 
    });
  }
}


