import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { StatusFinishedService } from './status-finished.service';
import { CreateFinishedStatusDTO } from './dto/createStatusFinished.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Status-finished')
@Controller('status-finished')
export class StatusFinishedController {
  constructor(private statusFinishedSvc: StatusFinishedService) {}

  @UseGuards(JwtAuthGuard)
  @Post('v1/create-finished')
  createFinished(@Body() _finishedData: CreateFinishedStatusDTO) {
    return this.statusFinishedSvc.createStatusFinished(_finishedData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('v1/get-all-finished')
  getAllFinished() {
    return this.statusFinishedSvc.getFinishedStatus();
  }
}
