export interface ILoginService {
  execute(mobile: string, password: string): Promise<string>;
}
