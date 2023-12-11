import { Tickets } from 'src/tickets/tickets.entity';
import { Users } from 'src/users/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'statusDevolutionTicket' })
export class StatusDevolution {
  @PrimaryGeneratedColumn()
  id_status: number;

  @Column()
  userOwnerId: number;

  @ManyToOne(() => Users, users => users.id)
  @JoinColumn({'name': 'userOwnerId'})
  userOwner: Users;

  @Column()
  qty: number;

  @Column()
  id_ticket: number;

  @ManyToOne(() => Tickets, tickets => tickets.statusDevolution)
  @JoinColumn({'name': 'id_ticket'})
  ticket: Tickets

  @Column({nullable: true})
  comment: string;

  @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: true})
  createdAt: number;

}

