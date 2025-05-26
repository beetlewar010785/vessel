import { AuthRepository } from '../../domain/auth';
import { AUTH_STORE_NAME, getDatabase } from './init';

const TOKEN_KEY = 'token';

export class IndexedDBAuthRepository implements AuthRepository {
  async getToken(): Promise<string | null> {
    const db = await getDatabase();
    return await db.get(AUTH_STORE_NAME, TOKEN_KEY);
  }

  async saveToken(token: string): Promise<void> {
    const db = await getDatabase();
    await db.put(AUTH_STORE_NAME, token, TOKEN_KEY);
  }

  async deleteToken(): Promise<void> {
    const db = await getDatabase();
    await db.delete(AUTH_STORE_NAME, TOKEN_KEY);
  }
}
