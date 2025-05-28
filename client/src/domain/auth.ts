export enum Role {
    TechManager = 'techManager',
    Captain = 'captain',
    ChiefEngineer = 'chiefEngineer',
}

export const AllRoles: Role[] = [Role.TechManager, Role.Captain, Role.ChiefEngineer];
export const AllCrewRoles: Role[] = [Role.Captain, Role.ChiefEngineer];

export interface UserProfile {
    role: Role;
    email: string;
    name: string;
    surname: string;
    vessel: string | null;
}

export interface AuthApi {
    login(email: string, password: string): Promise<string>;
    getProfile(token: string): Promise<UserProfile>;
}

export interface AuthRepository {
    getToken(): Promise<string | null>;
    saveToken(token: string): Promise<void>;
    deleteToken(): Promise<void>;
}

export interface AuthStorePort {
    login(profile: UserProfile): void;
    logout(): void;
}
