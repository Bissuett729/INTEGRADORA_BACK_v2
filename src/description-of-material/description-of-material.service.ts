import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DescriptionOfMaterial } from './descriptionOfMaterial.entity';
import { Repository } from 'typeorm';
import { CreateDescriptionDTO } from './dto/createDescription.dto';
import { TypesOfMaterialService } from 'src/types-of-material/types-of-material.service';
import { EventsGateway } from 'src/gateway/gateway';

@Injectable()
export class DescriptionOfMaterialService {
  constructor(
    @InjectRepository(DescriptionOfMaterial)
    private typeOfMaterialRepository: Repository<DescriptionOfMaterial>,
    private TypeSvc: TypesOfMaterialService,
    private gatewaySvc: EventsGateway,
  ) {}

  async createNewDescription(_description: CreateDescriptionDTO) {
    // Verificar si el tipo existe
    const typeFound = await this.TypeSvc.getOneType(_description.id_type);

    // Verificar si la descripción ya existe
    const descriptionFound = await this.typeOfMaterialRepository.findOne({
      where: {
        description: _description.description,
      },
    });

    // Validar si el tipo no existe
    if (!typeFound) {
      return new HttpException('Type not found', HttpStatus.NOT_FOUND);
    } else if (descriptionFound) {
      // Si la descripción ya existe, devuelve un error
      return new HttpException(
        'Description already exists',
        HttpStatus.CONFLICT,
      );
    } else {
      // Si el tipo existe y la descripción no existe, crea y guarda la nueva descripción
      const newDescription = this.typeOfMaterialRepository.create(_description);

      this.gatewaySvc.emitEvent('socket_create_description', {
        ok: true,
        msg: 'Socket Success!',
      });
      return this.typeOfMaterialRepository.save(newDescription);
    }
  }

  async getDescriptions() {
    // Recupera todas las descripciones de materiales con sus tipos relacionados
    return await this.typeOfMaterialRepository.find({
      relations: ['type'],
    });
  }
  
}
