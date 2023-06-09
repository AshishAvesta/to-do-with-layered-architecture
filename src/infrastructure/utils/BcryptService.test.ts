import bcrypt from 'bcrypt';
import { BcryptService } from './BcryptService';

const bcryptService = new BcryptService();

describe('BcryptService', () => {
  it('returns true if password matches the hash', async () => {
    const password = 'password123';
    const hash = await bcrypt.hash(password, 10);
    const result = await bcryptService.compare(password, hash);

    expect(result).toBe(true);
  });

  it('returns true if password matches the hash', async () => {
    const password = 'password123';
    const hash = await bcrypt.hash(password, 10);
    const result = await bcryptService.compare(password, hash);

    expect(result).toBe(true);
  });

  it('returns false if password does not match the hash', async () => {
    const password = 'password123';
    const hash = await bcrypt.hash('wrongpassword', 10);
    const result = await bcryptService.compare(password, hash);

    expect(result).toBe(false);
  });
});


