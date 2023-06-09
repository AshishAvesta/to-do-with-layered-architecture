import ICreateUserService from '../../../domain/interfaces/ICreateUserService';
import User from '../../../domain/entities/User';
import CreateUserDto from '../../dtos/CreateUserDto';
import ICreateUserUseCase from './ICreateUserUseCase';

class CreateUserUseCase implements ICreateUserUseCase {
  private createUserService: ICreateUserService;

  constructor(createUserService: ICreateUserService) {
    this.createUserService = createUserService;
  }

  async execute(createUserDto: CreateUserDto): Promise<User> {
    return await this.createUserService.execute(createUserDto);
  }
}

export default CreateUserUseCase;
