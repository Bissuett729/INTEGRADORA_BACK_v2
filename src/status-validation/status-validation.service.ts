import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusValidation } from './statusValidation.entity';
import { Repository } from 'typeorm';
import { CreateValidationDTO } from './dto/CreateValidation.dto';

@Injectable()
export class StatusValidationService {

    constructor(@InjectRepository(StatusValidation) private validationRepository: Repository<StatusValidation>) {}

    async createStatusValidation(_validationData: CreateValidationDTO) {
        const newValidation = this.validationRepository.create(_validationData)
        return this.validationRepository.save(newValidation)
    }

    async getValidationStatus() {
        return this.validationRepository.find({
            relations: ["userOwner"]
        });
    }
}
