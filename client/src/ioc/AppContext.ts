import { createContext, useContext } from 'react';
import { RequestApi } from '../infrastructure/apis/RequestApi';
import { RequestRepository } from '../domain/request';
import { IndexedDBRequestRepository } from '../infrastructure/db/IndexedDBRequestRepository';
import { AuthStore } from '../presentation/store/AuthStore';
import { RequestStore } from '../presentation/store/RequestStore';
import { LoginCommand, LoginUseCase } from '../application/use-cases/LoginUseCase';
import { LogoutUseCase } from '../application/use-cases/LogoutUseCase';
import {
    CreateRequestCommand,
    CreateRequestUseCase,
} from '../application/use-cases/CreateRequestUseCase';
import { RefreshRequestsUseCase } from '../application/use-cases/RefreshRequestsUseCase';
import { LoadingStore } from '../presentation/store/LoadingStore';
import { UseCase } from '../application/UseCase';
import { decorateLoading } from '../application/loadingDecorator';
import { IndexedDBAuthRepository } from '../infrastructure/db/IndexedDBAuthRepository';
import { CheckTokenUseCase } from '../application/use-cases/CheckTokenUseCase';
import { AuthApiImpl } from '../infrastructure/apis/AuthApi';

export const AppContext = createContext<AppDependencies | null>(null);

export interface AppDependencies {
    requestApi: RequestApi;
    requestRepository: RequestRepository;

    authStore: AuthStore;
    requestStore: RequestStore;
    loadingStore: LoadingStore;

    checkTokenUseCase: UseCase<void>;
    loginUseCase: UseCase<LoginCommand>;
    logoutUseCase: UseCase<void>;
    refreshRequestsUseCase: UseCase<void>;
    createRequestUseCase: UseCase<CreateRequestCommand>;
}

export function createAppDependencies(baseUrl: string): AppDependencies {
    const authApi = new AuthApiImpl(baseUrl);
    const requestApi = new RequestApi(baseUrl);

    const requestRepository = new IndexedDBRequestRepository();
    const authRepository = new IndexedDBAuthRepository();

    const authStore = new AuthStore();
    const requestStore = new RequestStore();
    const loadingStore = new LoadingStore();

    const checkTokenUseCase = decorateLoading(
        new CheckTokenUseCase(authRepository, authApi, authStore),
        loadingStore,
    );
    const loginUseCase = decorateLoading(
        new LoginUseCase(authApi, authRepository, authStore),
        loadingStore,
    );
    const logoutUseCase = decorateLoading(
        new LogoutUseCase(authRepository, authStore),
        loadingStore,
    );
    const refreshRequestsUseCase = decorateLoading(
        new RefreshRequestsUseCase(requestRepository, requestStore),
        loadingStore,
    );
    const createRequestUseCase = decorateLoading(
        new CreateRequestUseCase(requestRepository),
        loadingStore,
    );

    return {
        requestApi: requestApi,
        requestRepository: requestRepository,

        authStore: authStore,
        requestStore: requestStore,
        loadingStore: loadingStore,

        checkTokenUseCase: checkTokenUseCase,
        loginUseCase: loginUseCase,
        logoutUseCase: logoutUseCase,
        refreshRequestsUseCase: refreshRequestsUseCase,
        createRequestUseCase: createRequestUseCase,
    };
}

export function useAppContext() {
    const ctx = useContext(AppContext);
    if (!ctx) {
        throw new Error('AppContext not provided');
    }
    return ctx;
}
