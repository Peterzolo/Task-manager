import { Controller } from '@nestjs/common';

@Controller('auth')
export class AuthController {}

// import { Controller, Post, Body } from '@nestjs/common';
// import { AuthCredentialsDto } from './auth-credentials.dto';
// import { AuthService } from './auth.service';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('login')
//   async login(
//     @Body() credentials: AuthCredentialsDto,
//   ): Promise<{ message: string }> {
//     const isValid = await this.authService.validateUser(credentials);

//     if (isValid) {
//       return { message: 'Login successful' };
//     } else {
//       return { message: 'Invalid credentials' };
//     }
//   }
// }
