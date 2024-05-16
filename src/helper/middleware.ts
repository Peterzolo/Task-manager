

import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, NextFunction } from 'express';

import { AuthenticatedRequest, JwtPayload } from 'src/auth/types'; // Assuming JwtPayload is defined in auth/types

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.cookies['auth-token'];

    if (!token) {
      throw new UnauthorizedException('Unauthorized: Missing token');
    }

    try {
      const decoded = this.jwtService.verify<JwtPayload>(token);
      req.email = decoded.email;
      req.id = decoded.id;
      next();
    } catch (error) {
      throw new UnauthorizedException('Unauthorized: Invalid token');
    }
  }
}
