import { UseCase } from '../UseCase';
import { AuthApi, AuthRepository, AuthStorePort } from '../../domain/auth';

export class CheckTokenUseCase implements UseCase<void> {
  constructor(
    private authRepository: AuthRepository,
    private authApi: AuthApi,
    private authStore: AuthStorePort,
  ) {}

  async execute(): Promise<void> {
    const token = await this.authRepository.getToken();
    if (token) {
      const profile = await this.authApi.getProfile(token);
      this.authStore.login(profile);
    } else {
      this.authStore.logout();
    }
  }
}
