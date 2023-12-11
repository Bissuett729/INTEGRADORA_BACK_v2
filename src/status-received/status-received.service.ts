import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusReceived } from './statusReceived.entity';
import { CreateReceivedStatusDTO } from './dto/CreateStatusReceived.dto';
import { EventsGateway } from 'src/gateway/gateway';

@Injectable()
export class StatusReceivedService {
  constructor(
    @InjectRepository(StatusReceived)
    private receivedRepository: Repository<StatusReceived>,
    private gatewaySvc: EventsGateway
  ) {}

  async createStatusReceived(_receivedData: CreateReceivedStatusDTO) {
    const newReceived = this.receivedRepository.create(_receivedData);
    this.gatewaySvc.emitEvent('socket_status_received', {
      ok: true,
      data: newReceived,
      msg: 'Socket Success!',
    });
    return this.receivedRepository.save(newReceived);
  }

  async getReceivedStatus() {
    return this.receivedRepository.find({
      relations: ['userOwner'],
    });
  }
}
