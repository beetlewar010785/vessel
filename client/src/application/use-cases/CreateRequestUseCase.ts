import { Request, RequestRepository } from '../../domain/request';
import { UseCase } from '../UseCase';

export interface CreateRequestCommand {
    request: Request;
}

export class CreateRequestUseCase implements UseCase<CreateRequestCommand> {
    constructor(private requestRepository: RequestRepository) {}

    async execute(command: CreateRequestCommand): Promise<void> {
        await this.requestRepository.save(command.request);
    }
}
