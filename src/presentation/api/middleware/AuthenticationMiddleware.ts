import { Request, Response, NextFunction } from 'express';
import User from '../../../domain/entities/User';
import { ITokenService } from '../../../domain/interfaces/ITokenService';

import { IAuthenticationMiddleware } from './IAuthenticationMiddleware';
import './types';
export class AuthenticationMiddleware implements IAuthenticationMiddleware {
  private tokenService: ITokenService;
  
  constructor(tokenService: ITokenService) {
    this.authenticate = this.authenticate.bind(this);
    this.tokenService = tokenService;  
  }

  async authenticate(req: Request, res: Response, next: NextFunction) : Promise<void> {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
       res.sendStatus(401);
       return;
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = await this.tokenService.verify(token) as { user: User };
      req.user = decoded.user;
      next();
    } catch (err) {
      res.sendStatus(403);
    }
  }
}
