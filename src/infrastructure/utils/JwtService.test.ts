import jwt from 'jsonwebtoken';
import User from '../../domain/entities/User';
import { JwtService } from './JwtService';

const jwtService = new JwtService();
const secret = process.env.JWT_SECRET || 'avesta9'; 
describe('JwtService', () => {
  it('returns a valid jwt token', () => {
    const payload = new User('Jane Doe', 'jane@example.com', 'password', '0987654321','1');
    const token = jwtService.sign(payload, secret);
    const decoded = jwt.verify(token, secret);
    expect(decoded).toEqual(expect.objectContaining({user:payload}));
  });

  it('throws an error if token is invalid', () => {
    const invalidToken = 'invalidtoken';
    expect(() => jwt.verify(invalidToken, secret)).toThrow(jwt.JsonWebTokenError);
  });
});