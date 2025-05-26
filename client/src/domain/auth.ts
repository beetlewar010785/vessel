export enum Role {
  TechManager = 'techManager',
  Captain = 'captain',
  ChiefEngineer = 'chiefEngineer',
}

export interface UserProfile {
  role: Role;
  name: string;
  surname: string;
  vessel: string | null;
}

export interface AuthApi {
  login(login: string, password: string): Promise<string>;
  getProfile(token: string): Promise<UserProfile>;
}

export interface AuthRepository {
  getToken(): Promise<string | null>;
  saveToken(token: string): Promise<void>;
  deleteToken(): Promise<void>;
}

export interface AuthStorePort {
  login(token: string): void;
  logout(): void;
  setProfile(profile: UserProfile): void;
}
