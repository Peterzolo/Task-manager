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
      // Call the signIn method of AuthService
      await this.authService.signIn(authCredentialsDto, response);

      // If signIn succeeds, set response with success message
      response.status(200).json({ message: 'Sign-in successful' });
    } catch (error) {
      // Handle any errors from AuthService
      response.status(error.getStatus()).json({ message: error.message });
    }
  }
}
