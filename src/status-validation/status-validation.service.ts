import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusValidation } from './statusValidation.entity';
import { Repository } from 'typeorm';
import { CreateValidationDTO } from './dto/CreateValidation.dto';
import { EventsGateway } from 'src/gateway/gateway';

@Injectable()
export class StatusValidationService {

    constructor(@InjectRepository(StatusValidation) private validationRepository: Repository<StatusValidation>, private gatewaySvc: EventsGateway) {}

    async createStatusValidation(_validationData: CreateValidationDTO) {
        const newValidation = this.validationRepository.create(_validationData)
        this.gatewaySvc.emitEvent('socket_status_validation', {
            ok: true,
            data: newValidation,
            msg: 'Socket Success!',
          });
        return this.validationRepository.save(newValidation);
    }

    async getValidationStatus() {
        return this.validationRepository.find({
            relations: ["userOwner"]
        });
    }
}
