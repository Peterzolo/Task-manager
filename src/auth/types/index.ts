

import { Request } from 'express';

export interface IAuth {
  email: string;
  name:string;
  phone:string;
  password: string;
  timestamp?: Date;
}


export type SignInResponse = {
    message: string;
    token?: string;
  };
  
export interface JwtPayload {
  email: string;
  sub: string;
}

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}
