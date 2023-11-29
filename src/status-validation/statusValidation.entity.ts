import { Tickets } from 'src/tickets/tickets.entity';
import { Users } from 'src/users/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'statusValidationTicket' })
export class StatusValidation {
  @PrimaryGeneratedColumn()
  id_status: number;

  @Column()
  userOwnerId: number;

  @ManyToOne(() => Users, users => users.id)
  @JoinColumn({'name': 'userOwnerId'})
  userOwner: Users;

  @Column()
  status: string;
  
  @Column()
  id_ticket: number;

  @ManyToOne(() => Tickets, tickets => tickets.statusValidation)
  @JoinColumn({'name': 'id_ticket'})
  ticket: Tickets

  @Column({nullable: true})
  description: string;

  @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: true})
  createdAt: number;

}

