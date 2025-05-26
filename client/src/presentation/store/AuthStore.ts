import { signal } from '@preact/signals-react';
import { AuthStorePort, UserProfile } from '../../domain/auth';

export enum AuthState {
  UNKNOWN,
  AUTHORIZED,
  UNAUTHORIZED,
}

export class AuthStore implements AuthStorePort {
  private _authState = signal<AuthState>(AuthState.UNKNOWN);
  private _profile = signal<UserProfile | null>(null);

  get authState() {
    return this._authState;
  }

  get profile() {
    return this._profile;
  }

  login() {
    this._authState.value = AuthState.AUTHORIZED;
  }

  logout() {
    this._authState.value = AuthState.UNAUTHORIZED;
  }

  setProfile(profile: UserProfile | null) {
    this._profile.value = profile;
  }
}
