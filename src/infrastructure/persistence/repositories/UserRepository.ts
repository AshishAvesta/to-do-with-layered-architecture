import pool from '../../../../src/infrastructure/config/database';
import User from '../../../domain/entities/User';
import IUserRepository from '../../../domain/interfaces/IUserRepository';

class UserRepository implements IUserRepository {
  async createUser(user: User): Promise<User> {
    const query = {
      text: 'INSERT INTO users(name, email, password, mobile) VALUES($1, $2, $3, $4) RETURNING id',
      values: [user.name, user.email, user.password, user.mobile],
    };

    const res = await pool.query(query);
    user.id = res.rows[0].id;
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };

    const res = await pool.query(query);

    if (res.rows.length === 0) {
      return null;
    }

    const row = res.rows[0];
    return new User(row.name, row.email, row.password, row.mobile, row.id);
  }

  async getUserByMobile(mobile: string): Promise<User | null> {
    const query = {
      text: 'SELECT * FROM users WHERE mobile = $1',
      values: [mobile],
    };

    const res = await pool.query(query);

    if (res.rows.length === 0) {
      return null;
    }

    const row = res.rows[0];
    return new User(row.name, row.email, row.password, row.mobile, row.id);
  }
}

export default UserRepository;
