import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tools } from './tools.entity';
import { CreateToolDTO } from './dto/Createtool.dto';

@Injectable()
export class ToolsService {
  constructor(
    @InjectRepository(Tools)
    private toolsRepository: Repository<Tools>,
  ) {}

  async createTools(_tools: CreateToolDTO) {
    const toolsFound = await this.toolsRepository.findOne({
      where: {
        name: _tools.name,
      },
    });

    if (toolsFound) {
      return new HttpException('Tool already exists', HttpStatus.CONFLICT);
    }

    const newTool = this.toolsRepository.create(_tools);
    return this.toolsRepository.save(newTool);
  }

  async getTool() {
    return await this.toolsRepository.find({
      relations: ['for_bussiness']
    });
  }

  async getOneTool(_id: number) {
    const toolsFound = await this.toolsRepository.findOne({
      where: {
        id_tools: _id,
      },
    });

    if (!toolsFound) {
      return new HttpException('Tool not found', HttpStatus.NOT_FOUND);
    }

    return toolsFound;
  }
}
