import CreateUserDto from "../../../application/dtos/CreateUserDto";
import User from "../../entities/User";
import ICreateUserService from "../../interfaces/ICreateUserService";
import { IHashService } from "../../interfaces/IHashService";
import IUserRepository from "../../interfaces/IUserRepository";


class CreateUserService implements ICreateUserService {
  private userRepository: IUserRepository;
  private hashService :IHashService;

  constructor(userRepository: IUserRepository,hashService:IHashService) {
    this.userRepository = userRepository;
    this.hashService = hashService;
  }

  async execute (dto: CreateUserDto): Promise<User> {
    // Check if email is already in use
    const existingUserByEmail = await this.userRepository.getUserByEmail(dto.email);
    if (existingUserByEmail !== null) {
      throw new Error('Email is already in use');
    }

    // Check if mobile number is already in use
    const existingUserByMobile = await this.userRepository.getUserByMobile(dto.mobile);
    if (existingUserByMobile !== null) {
      throw new Error('Mobile number is already in use');
    }

    const hashedPassword = await this.hashService.hash(dto.password);

    const user = new User(dto.name, dto.email, hashedPassword, dto.mobile);
    const createdUser = await this.userRepository.createUser(user);

    return createdUser;
  }
}

export default CreateUserService;
