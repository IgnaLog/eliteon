export interface IAuthRepository {
  getToken(token: string): Promise<string | null>;
  deleteAllAndSaveNewToken(id: number, token: string): Promise<void>;
  deleteOldAndSaveNewToken(
    id: number,
    oldToken: string,
    newToken: string
  ): Promise<void>;
  createNewToken(id: number, token: string): Promise<void>;
  deleteAllTokensById(id: number): Promise<void>;
  deleteToken(token: string): Promise<void>;
}
