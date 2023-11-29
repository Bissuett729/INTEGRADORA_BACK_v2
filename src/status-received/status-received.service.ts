import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusReceived } from './statusReceived.entity';
import { CreateReceivedStatusDTO } from './dto/CreateStatusReceived.dto';

@Injectable()
export class StatusReceivedService {
  constructor(
    @InjectRepository(StatusReceived)
    private receivedRepository: Repository<StatusReceived>,
  ) {}

  async createStatusReceived(_receivedData: CreateReceivedStatusDTO) {
    const newReceived = this.receivedRepository.create(_receivedData);
    return this.receivedRepository.save(newReceived);
  }

  async getReceivedStatus() {
    return this.receivedRepository.find({
      relations: ['userOwner'],
    });
  }
}
