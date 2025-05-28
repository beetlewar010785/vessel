import { signal } from '@preact/signals-react';
import { AuthStorePort, UserProfile } from '../../domain/auth';

export enum AuthStatus {
    AUTHORIZED,
    UNAUTHORIZED,
}

export interface AuthStateBase {
    status: AuthStatus;
}

export interface AuthStateUnauthorized extends AuthStateBase {
    status: AuthStatus.UNAUTHORIZED;
}

export interface AuthStateAuthorized extends AuthStateBase {
    status: AuthStatus.AUTHORIZED;
    profile: UserProfile;
}

export type AuthState = AuthStateUnauthorized | AuthStateAuthorized;

export class AuthStore implements AuthStorePort {
    private _authState = signal<AuthState | null>(null);

    get authState() {
        return this._authState;
    }

    login(profile: UserProfile) {
        this._authState.value = {
            status: AuthStatus.AUTHORIZED,
            profile: profile,
        };
    }

    logout() {
        this._authState.value = {
            status: AuthStatus.UNAUTHORIZED,
        };
    }
}
