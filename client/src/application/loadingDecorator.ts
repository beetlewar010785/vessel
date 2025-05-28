import { UseCase } from './UseCase';
import { LoadingStorePort } from '../domain/loader';

export function decorateLoading<T>(
    useCase: UseCase<T>,
    loadingStore: LoadingStorePort,
): UseCase<T> {
    return new LoadingUseCaseDecorator(useCase, loadingStore);
}

class LoadingUseCaseDecorator<T> implements UseCase<T> {
    constructor(
        private inner: UseCase<T>,
        private loadingStore: LoadingStorePort,
    ) {}

    async execute(command: T): Promise<void> {
        this.loadingStore.setLoading(true);
        try {
            //await sleep(1000);
            await this.inner.execute(command);
        } finally {
            this.loadingStore.setLoading(false);
        }
    }
}
