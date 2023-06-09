import bcrypt from 'bcrypt';
import { IHashService } from '../../domain/interfaces/IHashService';

export class BcryptService implements IHashService {

    private saltRounds = 10;

    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
      }
    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}