import { ILoginService } from "../../../domain/interfaces/ILoginService";
import { ILoginUseCase } from "./ILoginUseCase";

export class LoginUseCase implements ILoginUseCase {
    constructor(private loginService: ILoginService) {}

    async execute(mobile: string, password: string): Promise<string> {
        return await this.loginService.execute(mobile, password);
      }
}
