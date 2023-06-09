import pool from '../../../../src/infrastructure/config/database';
import User from '../../../domain/entities/User';
import UserRepository from './UserRepository';
jest.mock('../../../../src/infrastructure/config/database');
describe('UserRepository', () => {
  
  let userRepository: UserRepository;

  beforeEach(() => {
    // Mock the PostgreSQL pool
    (pool.query as jest.Mock).mockClear();
        userRepository = new UserRepository();
  });

  test('creates a user successfully', async () => {
    const user = new User('John Doe', 'john@example.com', 'password', '1234567890');

    // Mock the return value of pool.query
    (pool.query as jest.Mock).mockResolvedValue({
      rows: [{ id: '1' }],
    });

    const createdUser = await userRepository.createUser(user);

    expect(createdUser).toBeInstanceOf(User);
    expect(createdUser.id).toBe('1');
  });

  // TODO: Add tests for getUserByEmail and getUserByMobile

  // Test for getUserByEmail
test('retrieves a user by email', async () => {
    // Mock the return value of pool.query
    (pool.query as jest.Mock).mockResolvedValue({
      rows: [{ id: '1', name: 'John Doe', email: 'john@example.com', password: 'password', mobile: '1234567890' }],
    });
  
    const user = await userRepository.getUserByEmail('john@example.com');
  
    expect(user).toBeInstanceOf(User);
    expect(user?.id).toBe('1');
    expect(user?.email).toBe('john@example.com');
  });
  
  test('returns null if no user is found by email', async () => {
    // Mock the return value of pool.query
    (pool.query as jest.Mock).mockResolvedValue({
      rows: [],
    });
  
    const user = await userRepository.getUserByEmail('notfound@example.com');
  
    expect(user).toBeNull();
  });
  
  // Test for getUserByMobile
  test('retrieves a user by mobile', async () => {
    // Mock the return value of pool.query
    (pool.query as jest.Mock).mockResolvedValue({
      rows: [{ id: '1', name: 'John Doe', email: 'john@example.com', password: 'password', mobile: '1234567890' }],
    });
  
    const user = await userRepository.getUserByMobile('1234567890');
  
    expect(user).toBeInstanceOf(User);
    expect(user?.id).toBe('1');
    expect(user?.mobile).toBe('1234567890');
  });
  
  test('returns null if no user is found by mobile', async () => {
    // Mock the return value of pool.query
    (pool.query as jest.Mock).mockResolvedValue({
      rows: [],
    });
  
    const user = await userRepository.getUserByMobile('0987654321');
  
    expect(user).toBeNull();
  });

  // In UserRespository.test.ts
test('getUserByMobile returns user if they exist', async () => {
  // setup
  const user = new User('ashish','ashish@gmail.com','123456','7777777777','1');
  (pool.query as jest.Mock).mockResolvedValue({
    rows: [user],
  });
  const retrievedUser = await userRepository.getUserByMobile('7777777777');

  // verify
  expect(retrievedUser).toEqual(user);
});

test('getUserByMobile returns null if user does not exist', async () => {
  // setup
  //const user = new User('ashish','ashish@gmail.com','123456','7777777777','1');
  (pool.query as jest.Mock).mockResolvedValue({
    rows: [],
  });
  // exercise
  const retrievedUser = await userRepository.getUserByMobile('1234567890');

  // verify
  expect(retrievedUser).toBeNull();
});

  
});
