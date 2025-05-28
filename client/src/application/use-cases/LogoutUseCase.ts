import { AuthRepository, AuthStorePort } from '../../domain/auth';
import { UseCase } from '../UseCase';

export class LogoutUseCase implements UseCase<void> {
    constructor(
        private authRepository: AuthRepository,
        private authStore: AuthStorePort,
    ) {}

    async execute(): Promise<void> {
        await this.authRepository.deleteToken();
        this.authStore.logout();
    }
}
