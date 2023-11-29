import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusFinished } from './statusFinished.entity';
import { Repository } from 'typeorm';
import { CreateFinishedStatusDTO } from './dto/createStatusFinished.dto';

@Injectable()
export class StatusFinishedService {
  constructor(
    @InjectRepository(StatusFinished)
    private finishedRepository: Repository<StatusFinished>,
  ) {}

  async createStatusFinished(_finishedData: CreateFinishedStatusDTO) {
    const newFinishedStatus = this.finishedRepository.create(_finishedData);
    return this.finishedRepository.save(newFinishedStatus);
  }

  async getFinishedStatus() {
    return this.finishedRepository.find({
      relations: ['userOwner'],
    });
  }
}
