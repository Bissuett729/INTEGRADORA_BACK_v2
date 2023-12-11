import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusDevolution } from './statusDevolution.entity';
import { CreateDevolutionStatusDTO } from './dto/createStatusDevolution.dto';
import { EventsGateway } from 'src/gateway/gateway';

@Injectable()
export class StatusDevolutionService {
  constructor(
    @InjectRepository(StatusDevolution)
    private devolutionRepository: Repository<StatusDevolution>,
    private gatewaySvc: EventsGateway
  ) {}

  async createStatusDevolution(_devolutionData: CreateDevolutionStatusDTO) {
    const newDevolutionStatus = this.devolutionRepository.create(_devolutionData);
    this.gatewaySvc.emitEvent('socket_status_devolution', {
      ok: true,
      data: newDevolutionStatus,
      msg: 'Socket Success!',
    });
    return this.devolutionRepository.save(newDevolutionStatus);
  }

  async getDevolutionStatus() {
    return this.devolutionRepository.find({
      relations: ['userOwner'],
    });
  }
}
