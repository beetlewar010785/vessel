import { RequestRepository, RequestStorePort } from '../../domain/request';
import { UseCase } from '../UseCase';

export class RefreshRequestsUseCase implements UseCase<void> {
  constructor(
    private requestRepository: RequestRepository,
    private requestStore: RequestStorePort,
  ) {}

  async execute(): Promise<void> {
    const requests = await this.requestRepository.getAll();
    requests.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    this.requestStore.setRequests(requests);
  }
}
