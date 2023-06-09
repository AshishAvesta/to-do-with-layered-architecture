import User from '../entities/User';

interface IUserRepository {
  createUser(user: User): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserByMobile(mobile: string): Promise<User | null>;
  
  getUserByMobile(mobile: string): Promise<User | null>;
}

export default IUserRepository;
