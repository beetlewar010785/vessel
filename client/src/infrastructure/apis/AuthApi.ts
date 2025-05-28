import { AuthApi, UserProfile } from '../../domain/auth';

export class AuthApiImpl implements AuthApi {
  constructor(private readonly baseUrl: string) {}

  async login(email: string, password: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 401) {
      throw new Error('Invalid login or password');
    }

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    return data.token as string;
  }

  async getProfile(token: string): Promise<UserProfile> {
    const response = await fetch(`${this.baseUrl}/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Get profile failed');
    }

    const data = await response.json();
    return data as UserProfile;
  }
}
