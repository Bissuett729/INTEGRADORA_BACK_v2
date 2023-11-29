import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tickets } from './tickets.entity';
import { CreateTicketDTO } from './dto/createTicket.dto';
import { UpdateTicketDTO } from './dto/updateTicket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Tickets) private ticketsRepository: Repository<Tickets>,
  ) {}

  async createTicket(_ticket: CreateTicketDTO) {
    const newTicket = this.ticketsRepository.create(_ticket);
    return this.ticketsRepository.save(newTicket);
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

  async getCountTickets(_id_user: string) {
    const countTickets = await this.ticketsRepository.find({
      where: {
        userOwner_ID: _id_user,
      },
    });
    return countTickets.length;
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
