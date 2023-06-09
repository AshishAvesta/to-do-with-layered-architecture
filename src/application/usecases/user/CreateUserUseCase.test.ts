import User from "../../../domain/entities/User";
import ICreateUserService from "../../../domain/interfaces/ICreateUserService";
import CreateUserDto from "../../dtos/CreateUserDto";
import CreateUserUseCase from "./CreateUserUseCase";

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let mockCreateUserService: jest.Mocked<ICreateUserService>;

  beforeEach(() => {
    mockCreateUserService = {
      execute: jest.fn(),
    };
    createUserUseCase = new CreateUserUseCase(mockCreateUserService);
  });

  it('should call createUserService with correct params and return a new user', async () => {
    const dto: CreateUserDto = { name: 'test', email: 'test@test.com', password: 'password', mobile: '1234567890' };
    const newUser: User = new User('test', 'test@test.com', 'password', '1234567890','1');

    mockCreateUserService.execute.mockResolvedValueOnce(newUser);
    
    const result = await createUserUseCase.execute(dto);

    expect(mockCreateUserService.execute).toHaveBeenCalledWith(dto);
    expect(result).toEqual(newUser);
  });

  it('should throw an error if createUserService throws an error', async () => {
    const dto: CreateUserDto = { name: 'test', email: 'test@test.com', password: 'password', mobile: '1234567890' };

    mockCreateUserService.execute.mockRejectedValueOnce(new Error('Test error'));

    await expect(createUserUseCase.execute(dto)).rejects.toThrow('Test error');
  });
});
