import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tickets } from './tickets.entity';
import { CreateTicketDTO } from './dto/createTicket.dto';
import { UpdateTicketDTO } from './dto/updateTicket.dto';
import { EventsGateway } from 'src/gateway/gateway';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Tickets) private ticketsRepository: Repository<Tickets>,
    private gatewaySvc: EventsGateway,
  ) {}

  async createTicket(_ticket: CreateTicketDTO) {
    const newTicket = this.ticketsRepository.create(_ticket);
    const saveTicket = this.ticketsRepository.save(newTicket);
    this.gatewaySvc.emitEvent('socket_create_ticket', {
      ok: true,
      data: saveTicket,
      msg: 'Socket Success!',
    });
    
    return saveTicket;
  }

  async getTickets(user_id: string): Promise<Tickets[]> {
    return await this.ticketsRepository.find({
      where: { userOwner_ID: user_id },
      relations: [
        'userOwner',
        'statusDevolution',
        'statusFinished',
        'statusReceived',
        'statusValidation',
      ],
    });
  }

  async getAllTickets(): Promise<Tickets[]> {
    const allTickets = await this.ticketsRepository.find({
      relations: [
        'userOwner',
        'statusDevolution',
        'statusFinished',
        'statusReceived',
        'statusValidation',
      ],
    });

    this.gatewaySvc.emitEvent('socket_get_all_tickets', {
      ok: true,
      data: allTickets,
      msg: 'Socket Success!',
    });
    return allTickets;
  }

  async getCountTickets(_id_user: string): Promise<any> {
    return new Promise(async(resolve, reject)=>{
      try {
        const countTickets = await this.ticketsRepository.find({
          where: {
            userOwner_ID: _id_user,
          },
        });
        this.gatewaySvc.emitEvent('socket_get_count_tickets', {
          ok: true,
          data: countTickets.length,
          msg: 'Socket Success!',
        });
        resolve(countTickets.length);
      } catch (error) {
        reject(new ConflictException(error.message));
      }
    });
  }

  async getTicketsRange(
    start?: number,
    end?: number,
    _id_user?: string,
  ): Promise<Tickets[]> {
    const tickets = await this.ticketsRepository.find({
      where: {
        userOwner_ID: _id_user,
      },
      relations: [
        'userOwner',
        'statusDevolution',
        'statusFinished',
        'statusReceived',
        'statusValidation',
      ],
    });

    if (start && end && end > 0) {
      return tickets.slice(start - 1, end);
    } else if (start && (!end || end <= 0)) {
      return tickets.slice(start - 1);
    }

    return tickets;
  }

  async getOneTicket(_id: number) {
    const ticketFound = await this.ticketsRepository.findOne({
      where: {
        id_tickets: _id,
      },
      relations: [
        'userOwner',
        'statusDevolution',
        'statusFinished',
        'statusReceived',
        'statusValidation',
      ],
    });

    if (!ticketFound) {
      return new HttpException('Ticket not found', HttpStatus.NOT_FOUND);
    }

    return ticketFound;
  }

  async deleteTicket(_id: number) {
    const result = await this.ticketsRepository.delete({ id_tickets: _id });

    if (result.affected === 0) {
      return new HttpException('Ticket not found', HttpStatus.NOT_FOUND);
    }

    return new HttpException('Ticket successfully deleted', HttpStatus.OK);
  }

  async updateTicket(_id: number, _ticket: UpdateTicketDTO) {
    const ticketFound = await this.ticketsRepository.findOne({
      where: {
        id_tickets: _id,
      },
    });

    if (!ticketFound) {
      return new HttpException('ticket not found', HttpStatus.NOT_FOUND);
    }

    const updateTicket = Object.assign(ticketFound, _ticket);
    return this.ticketsRepository.save(updateTicket);
  }
}
