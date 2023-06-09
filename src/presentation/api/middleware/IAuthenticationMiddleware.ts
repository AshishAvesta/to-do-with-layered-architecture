import { Request, Response, NextFunction } from 'express';
export interface IAuthenticationMiddleware {
    authenticate(req: Request, res: Response, next: NextFunction): Promise<void>;
}


