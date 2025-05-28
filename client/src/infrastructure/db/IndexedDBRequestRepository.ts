import type { Request, RequestRepository } from '../../domain/request';
import { getDatabase, REQUEST_STORE_NAME } from './init';

export class IndexedDBRequestRepository implements RequestRepository {
    async save(request: Request): Promise<void> {
        const db = await getDatabase();
        await db.put(REQUEST_STORE_NAME, request);
    }

    async getAll(): Promise<Request[]> {
        const db = await getDatabase();
        return await db.getAll(REQUEST_STORE_NAME);
    }
}
