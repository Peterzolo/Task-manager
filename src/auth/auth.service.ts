import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  Injectable,
    NotFoundException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './authDto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth,AuthDocument} from './schema/auth.model';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>) {}
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


  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<Auth> {
    const { email, password } = authCredentialsDto;

    // Find the user by email
    const user = await this.authModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if the provided password matches the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundException('Invalid credentials');
    }

    return user;
  }

}


