import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateValidationDTO } from './dto/CreateValidation.dto';
import { StatusValidationService } from './status-validation.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Status-validation')
@Controller('status-validation')
export class StatusValidationController {
  constructor(private statusValidationSvc: StatusValidationService) {}

  @UseGuards(JwtAuthGuard)
  @Post('v1/create-validation')
  createTool(@Body() _validationData: CreateValidationDTO) {
    return this.statusValidationSvc.createStatusValidation(_validationData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('v1/get-all-tools')
  getAllTool() {
    return this.statusValidationSvc.getValidationStatus();
  }
}
