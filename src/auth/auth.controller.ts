import { Body, Controller, Post,Res, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './authDto/auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ message: string }> {
    await this.authService.signUp(authCredentialsDto);
    return { message: 'User signed up successfully' };
  }


  @Post('signin')
  async signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const token = await this.authService.signIn(authCredentialsDto);
      response.cookie('auth-token', token, {
        httpOnly: true,
        maxAge: 3600000,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      response.status(200).json({ message: 'Sign-in successful' });
    } catch (error) {
      response.status(error.getStatus()).json({ message: error.message });
    }
  }
}
