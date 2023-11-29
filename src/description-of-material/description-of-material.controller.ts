import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DescriptionOfMaterialService } from './description-of-material.service';
import { CreateDescriptionDTO } from './dto/createDescription.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Description-of-material')
@Controller('description-of-material')
export class DescriptionOfMaterialController {
  constructor(private descriptionSvc: DescriptionOfMaterialService) {}

  @UseGuards(JwtAuthGuard)
  @Post('v1/create-description-material')
  createDescription(@Body() _description: CreateDescriptionDTO) {
    return this.descriptionSvc.createNewDescription(_description);
  }

  @UseGuards(JwtAuthGuard)
  @Get('v1/get-all-description-material')
  getAllDescriptions() {
    return this.descriptionSvc.getDescriptions();
  }
}
