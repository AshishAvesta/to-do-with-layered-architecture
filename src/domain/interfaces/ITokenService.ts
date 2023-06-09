import User from "../entities/User";

export interface ITokenService {
    sign(payload: User, secretOrPrivateKey: string, options?: object): string;
    verify(token: string): string | object;
}