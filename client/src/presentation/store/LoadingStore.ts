import { signal } from '@preact/signals-react';
import { LoadingStorePort } from '../../domain/loader';

export class LoadingStore implements LoadingStorePort {
    private readonly _loading = signal(false);

    get loading() {
        return this._loading;
    }

    setLoading(loading: boolean): void {
        this._loading.value = loading;
    }
}
