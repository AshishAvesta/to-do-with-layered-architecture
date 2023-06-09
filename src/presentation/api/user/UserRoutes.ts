
import express from 'express';
import { UserController } from './UserController';
import { Request, Response } from 'express';
import { validate } from './validations';
import { IAuthenticationMiddleware } from '../middleware/IAuthenticationMiddleware';
export class UserRouter {
  private userController: UserController;
  private authMiddleware : IAuthenticationMiddleware;
  constructor(userController: UserController,authMiddleware:IAuthenticationMiddleware) {
    this.userController = userController;
    this.authMiddleware = authMiddleware;
  }

  router(): express.Router {
    const router = express.Router();

    router.post('/',this.authMiddleware.authenticate,validate, (req:Request, res:Response) => this.userController.createUser(req, res));
    return router;
  }
}
