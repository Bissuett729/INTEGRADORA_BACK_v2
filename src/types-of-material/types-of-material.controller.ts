import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TypesOfMaterialService } from './types-of-material.service';
import { CreateTypeDTO } from './dto/createType.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('types-of-material')
@Controller('types-of-material')
export class TypesOfMaterialController {
    constructor(private typeOfMaterialSvc: TypesOfMaterialService) {}

    @UseGuards(JwtAuthGuard)
    @Post('v1/create-type')
    createTool(@Body() _type: CreateTypeDTO) {
      return this.typeOfMaterialSvc.createNewType(_type);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get('v1/get-all-descriptions')
    getAllDescriptions() {
      return this.typeOfMaterialSvc.getTypes();
    }
}
