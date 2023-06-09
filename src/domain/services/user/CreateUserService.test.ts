import CreateUserDto from "../../../application/dtos/CreateUserDto";
import User from "../../entities/User";
import { IHashService } from "../../interfaces/IHashService";
import IUserRepository from "../../interfaces/IUserRepository";
import CreateUserService from "./CreateUserService";


describe('CreateUserService', () => {
  let createUserDto: CreateUserDto;
  let userRepository: IUserRepository;
  let createUserService: CreateUserService;
  let mockHashService : IHashService; 

  beforeEach(() => {
    createUserDto = new CreateUserDto('John Doe', 'john@example.com', 'password', '1234567890');

    userRepository = {
      getUserByEmail: jest.fn(),
      getUserByMobile: jest.fn(),
      createUser: jest.fn(),
    };

    mockHashService = {
      compare: jest.fn(),
      hash: jest.fn().mockResolvedValue('hashedPassword')
    };

    createUserService = new CreateUserService(userRepository,mockHashService);
  });

  it('throws an error if the email is already in use', async () => {
    (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(new User('Jane Doe', 'jane@example.com', 'password', '0987654321','1'));

    await expect(createUserService.execute(createUserDto)).rejects.toThrow('Email is already in use');
  });

  it('throws an error if the mobile number is already in use', async () => {
    
    (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(null);  // Mock this to return null

    (userRepository.getUserByMobile as jest.Mock).mockResolvedValue(new User('Jane Doe', 'jane@example.com', 'password', '0987654321','1'));

    await expect(createUserService.execute(createUserDto)).rejects.toThrow('Mobile number is already in use');
  });

  it('creates a user if the email and mobile number are not in use', async () => {
    (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(null);
    (userRepository.getUserByMobile as jest.Mock).mockResolvedValue(null);
    (userRepository.createUser as jest.Mock).mockResolvedValue(new User(createUserDto.name, createUserDto.email, createUserDto.password, createUserDto.mobile,'1'));

    const user = await createUserService.execute(createUserDto);
    
    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe('1');
    expect(user.name).toBe(createUserDto.name);
    expect(user.email).toBe(createUserDto.email);
    expect(user.password).toBe(createUserDto.password);
    expect(user.mobile).toBe(createUserDto.mobile);
  });

  it('hashes the password before saving the user', async () => {
   
    (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(null);
    (userRepository.getUserByMobile as jest.Mock).mockResolvedValue(null);
    const user = new User('John Doe', 'john@example.com', 'plainPassword', '1234567890');

    // Act
    await createUserService.execute(user);

    // Assert
    expect(mockHashService.hash).toHaveBeenCalledWith('plainPassword');
    expect(userRepository.createUser).toHaveBeenCalledWith(
      expect.objectContaining({
        password: 'hashedPassword',
      }),
    );
  });
});
