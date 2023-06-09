import User from '../entities/User';
import CreateUserDto from '../../application/dtos/CreateUserDto';

interface ICreateUserService {
    execute(createUserDto: CreateUserDto): Promise<User>;
}

export default ICreateUserService;
