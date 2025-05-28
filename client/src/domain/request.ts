export type RequestType = 'Refueling' | 'Food Order' | 'Port Entry Request';

interface RequestBase {
    id: string;
    type: RequestType;
    createdAt: Date;
    description?: string;
}

export interface RefuelingRequest extends RequestBase {
    type: 'Refueling';
    liters: number;
}

export interface FoodOrderRequest extends RequestBase {
    type: 'Food Order';
}

export interface PortEntryRequest extends RequestBase {
    type: 'Port Entry Request';
    portName: string;
}

export type Request = RefuelingRequest | FoodOrderRequest | PortEntryRequest;

export interface RequestRepository {
    save(request: Request): Promise<void>;
    getAll(): Promise<Request[]>;
}

export interface RequestStorePort {
    setRequests(requests: Request[]): void;
}
