import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { StatusDevolutionService } from './status-devolution.service';
import { CreateDevolutionStatusDTO } from './dto/createStatusDevolution.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Status-devolution')
@Controller('status-devolution')
export class StatusDevolutionController {
  constructor(private statusDevolutionSvc: StatusDevolutionService) {}

  @UseGuards(JwtAuthGuard)
  @Post('v1/create-devolution')
  createDevolution(@Body() _devolutionData: CreateDevolutionStatusDTO) {
    return this.statusDevolutionSvc.createStatusDevolution(_devolutionData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('v1/get-all-devolution')
  getAllDevolution() {
    return this.statusDevolutionSvc.getDevolutionStatus();
  }
}
