import CreateUserDto from "../../dtos/CreateUserDto";
import User from "../../../domain/entities/User";

interface ICreateUserUseCase {
  execute(createUserDto: CreateUserDto): Promise<User>;
}

export default ICreateUserUseCase;
