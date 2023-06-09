import { Request, Response } from 'express';
import { ILoginUseCase } from '../../../application/usecases/login/ILoginUseCase';


export class LoginController{
  constructor(private loginUseCase: ILoginUseCase) {}

  async processLoginRequest(req: Request, res: Response): Promise<void> {
    try {
      const { mobile, password } = req.body;
      const token = await this.loginUseCase.execute(mobile, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).send((error as Error).message);
    }
  }
}
