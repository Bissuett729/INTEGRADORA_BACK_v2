import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Tickets } from './tickets.entity';
import { CreateTicketDTO } from './dto/createTicket.dto';
import { UpdateTicketDTO } from './dto/updateTicket.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private ticketsSvc: TicketsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('v1/get-all-tickets/:id_user')
  getTickets(@Param('id_user') id_user?: string): Promise<Tickets[]> {
    // Ahora puedes utilizar los parámetros en tu lógica para obtener los tickets
    return this.ticketsSvc.getTickets(id_user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('v1/get-count-tickets/:id_user')
  getCountTickets(@Param('id_user') _id_user?: string) {
    return this.ticketsSvc.getCountTickets(_id_user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('v1/get-tickets-range/:since/:from/:id_user')
  getTicketsRange(
    @Param('since') since?: number,
    @Param('from') from?: number,
    @Param('id_user') _id_user?: string,
  ): Promise<Tickets[]> {
    // Llamamos al servicio y le pasamos los parámetros de inicio y fin
    return this.ticketsSvc.getTicketsRange(since, from, _id_user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('v1/get-one-ticket/:id')
  getOneTicket(@Param('id', ParseIntPipe) _id: number): Promise<any> {
    return this.ticketsSvc.getOneTicket(_id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('v1/create-ticket')
  createTicket(@Body() _newTicket: CreateTicketDTO) {
    return this.ticketsSvc.createTicket(_newTicket);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('v1/delete-ticket/:id')
  deleteTicket(@Param('id', ParseIntPipe) _id: number) {
    return this.ticketsSvc.deleteTicket(_id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('v1/update-ticket/:id')
  updateTicket(
    @Param('id', ParseIntPipe) _id: number,
    @Body() _ticket: UpdateTicketDTO,
  ) {
    return this.ticketsSvc.updateTicket(_id, _ticket);
  }
}
