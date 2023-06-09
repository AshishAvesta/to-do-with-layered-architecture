import jwt from 'jsonwebtoken';
import User from '../../domain/entities/User';
import { ITokenService } from '../../domain/interfaces/ITokenService';

export class JwtService implements ITokenService {
    sign(payload: User, secretOrPrivateKey: string, options?: object): string {
        return jwt.sign({user: payload}, secretOrPrivateKey, options);
    }

    verify(token: string): string | object {
        try {
          const secret = process.env.JWT_SECRET || 'avesta9'; // The secret is fetched from environment variables
          return jwt.verify(token, secret);
        } catch (err) {
          throw new Error('Invalid token');
        }
      }
}