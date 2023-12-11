import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOfMaterial } from './typesOfMaterial.entity';
import { Repository } from 'typeorm';
import { CreateTypeDTO } from './dto/createType.dto';
import { EventsGateway } from 'src/gateway/gateway';

@Injectable()
export class TypesOfMaterialService {
  constructor(
    @InjectRepository(TypeOfMaterial)
    private typeOfMaterialRepository: Repository<TypeOfMaterial>,
    private gatewaySvc: EventsGateway,
  ) {}

  async createNewType(_type: CreateTypeDTO) {
    const typeFound = await this.typeOfMaterialRepository.findOne({
      where: {
        name: _type.name,
      },
    });

    if (typeFound) {
      return new HttpException('Type already exists', HttpStatus.CONFLICT);
    }

    const newType = this.typeOfMaterialRepository.create(_type);

    this.gatewaySvc.emitEvent('socket_create_type', {
      ok: true,
      msg: 'Socket Success!',
    });
    return this.typeOfMaterialRepository.save(newType);
  }

  async getTypes() {
    return await this.typeOfMaterialRepository.find({
      relations: ['descriptions']
    });
  }

  async getOneType(_id: number) {
    const typeFound = await this.typeOfMaterialRepository.findOne({
      where: {
        id_type: _id,
      },
    });

    if (!typeFound) {
      return new HttpException('Type not found', HttpStatus.NOT_FOUND);
    }

    return typeFound;
  }
}


