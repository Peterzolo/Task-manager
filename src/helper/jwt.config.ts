



import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: process.env.JWT_SECRET || 'default_secret_key',
  signOptions: { expiresIn: '1h' },
};
