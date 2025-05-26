import { signal } from '@preact/signals-react';
import type { Request, RequestStorePort } from '../../domain/request';

export class RequestStore implements RequestStorePort {
  private readonly _requests = signal<Request[]>([]);

  get requests() {
    return this._requests;
  }

  setRequests(requests: Request[]): void {
    this._requests.value = requests;
  }
}
