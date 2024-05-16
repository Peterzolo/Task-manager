import { Body, Controller, Post,Res, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, AuthenticationDto } from './taskDto/task.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body(ValidationPipe) signUpDto: SignUpDto,
  ): Promise<{ message: string }> {
    await this.authService.signUp(signUpDto);
    return { message: 'User signed up successfully' };
  }


  @Post('signin')
  async signIn(
    @Body(ValidationPipe) authenticationDto: AuthenticationDto,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const token = await this.authService.signIn(authenticationDto);
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
