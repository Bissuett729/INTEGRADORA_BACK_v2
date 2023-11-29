import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bussiness } from './bussiness.entity';
import { Repository } from 'typeorm';
import { CreateBussinessDTO } from './dto/createBussiness.dto';

@Injectable()
export class BussinessService {
  constructor(
    @InjectRepository(Bussiness)
    private bussinessRepository: Repository<Bussiness>,
  ) {}

  async createBussiness(_bussiness: CreateBussinessDTO) {
    const bussinessFound = await this.bussinessRepository.findOne({
      where: {
        name: _bussiness.name,
      },
    });

    if (bussinessFound) {
      return new HttpException('Bussiness already exists', HttpStatus.CONFLICT);
    }

    const newBussiness = this.bussinessRepository.create(_bussiness);
    return this.bussinessRepository.save(newBussiness);
  }

  async getBussiness() {
    return await this.bussinessRepository.find({
      relations: ['tools']
    });
  }

  async getOneBussiness(_id: number) {
    const bussinessFound = await this.bussinessRepository.findOne({
      where: {
        id_bussiness: _id,
      },
      relations: ['tools']
    });

    if (!bussinessFound) {
      return new HttpException('Bussiness not found', HttpStatus.NOT_FOUND);
    }

    return bussinessFound;
  }
}
