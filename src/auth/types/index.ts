




export type SignInResponse = {
    message: string;
    token?: string;
  };
  

  export interface IAuth {
    id: number;
    password: string;
    email: string;
  }


 
  // auth.types.ts

import { Request } from 'express';

export interface JwtPayload {
  email: string;
  sub: string;
}

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}
