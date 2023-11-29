import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusDevolution } from './statusDevolution.entity';
import { CreateDevolutionStatusDTO } from './dto/createStatusDevolution.dto';

@Injectable()
export class StatusDevolutionService {
  constructor(
    @InjectRepository(StatusDevolution)
    private devolutionRepository: Repository<StatusDevolution>,
  ) {}

  async createStatusDevolution(_devolutionData: CreateDevolutionStatusDTO) {
    const newDevolutionStatus = this.devolutionRepository.create(_devolutionData);
    return this.devolutionRepository.save(newDevolutionStatus);
  }

  async getDevolutionStatus() {
    return this.devolutionRepository.find({
      relations: ['userOwner'],
    });
  }
}
