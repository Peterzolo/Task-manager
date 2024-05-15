


import { JwtModuleOptions } from '@nestjs/jwt';


const defaultExpiresIn = '1h';

export const jwtConfig: JwtModuleOptions = {
  secret: process.env.JWT_SECRET || 'default_secret_key',
  signOptions: { expiresIn: process.env.EXPIRES || defaultExpiresIn },
};
