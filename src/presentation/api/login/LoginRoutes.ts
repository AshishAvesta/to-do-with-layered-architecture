import express from 'express';
import { LoginController } from './LoginController';
import { Request, Response } from 'express';
import { loginValidationRules, validate } from './validations';

export class LoginRoutes {
  private loginController: LoginController;

  constructor(loginController: LoginController) {
    this.loginController = loginController;
  }

  public router(): express.Router {
    const router = express.Router();

    router.post('/',loginValidationRules(),validate, (req: Request, res: Response) => this.loginController.processLoginRequest(req, res));

    return router;
  }
}
