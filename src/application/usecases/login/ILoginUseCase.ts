// ILoginUseCase.ts
export interface ILoginUseCase {
  execute(mobile: string, password: string): Promise<string>;
}
