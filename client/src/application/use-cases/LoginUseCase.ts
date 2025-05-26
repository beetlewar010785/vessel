import { AuthApi, AuthRepository, AuthStorePort } from '../../domain/auth';
import { UseCase } from '../UseCase';

export interface LoginCommand {
  username: string;
  password: string;
}

export class LoginUseCase implements UseCase<LoginCommand> {
  constructor(
    private authApi: AuthApi,
    private authRepository: AuthRepository,
    private authStore: AuthStorePort,
  ) {}

  async execute(command: LoginCommand): Promise<void> {
    const token = await this.authApi.login(command.username, command.password);

    await this.authRepository.saveToken(token);
    this.authStore.login(token);

    const profile = await this.authApi.getProfile(token);
    this.authStore.setProfile(profile);
  }
}
