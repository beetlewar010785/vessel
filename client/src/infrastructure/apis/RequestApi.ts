import type { Request } from '../../domain/request';

export class RequestApi {
    constructor(private baseUrl: string) {}

    private url(path: string): string {
        return `${this.baseUrl}${path}`;
    }

    async createRequest(input: Request): Promise<void> {
        const res = await fetch(this.url('/requests'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
        });

        if (!res.ok) {
            const msg = await res.text();
            throw new Error(`Failed to create request: ${res.status} ${msg}`);
        }
    }

    async getRequests(): Promise<Request[]> {
        const res = await fetch(this.url('/requests'));

        if (!res.ok) {
            const msg = await res.text();
            throw new Error(`Failed to get requests: ${res.status} ${msg}`);
        }

        const raw = await res.json();

        return raw.map((r: Omit<Request, 'status'>) => ({
            ...r,
            status: 'Online',
            createdAt: new Date(r.createdAt), // ✅ если приходит строка
        }));
    }
}
