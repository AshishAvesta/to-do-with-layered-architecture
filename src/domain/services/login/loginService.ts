import { ILoginService } from '../../interfaces/ILoginService';
import IUserRepository from '../../interfaces/IUserRepository';
import { IHashService } from '../../interfaces/IHashService';
import { ITokenService } from '../../interfaces/ITokenService';


export class LoginService implements ILoginService {
  constructor(private userRepository: IUserRepository, 
    private hashService: IHashService, 
    private tokenService: ITokenService) {}

  async execute(mobile: string, password: string): Promise<string> {
    const user = await this.userRepository.getUserByMobile(mobile);
    if (!user) throw new Error("User not found");
    
    const validPassword = await this.hashService.compare(password, user.password);
    if (!validPassword) throw new Error("Invalid password");

    const secret = process.env.JWT_SECRET || 'avesta9';
    const token = this.tokenService.sign(user , secret , { expiresIn: '6h' });
    return token;
  }
}