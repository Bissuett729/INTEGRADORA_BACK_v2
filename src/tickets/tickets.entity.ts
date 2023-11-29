import { StatusDevolution } from 'src/status-devolution/statusDevolution.entity';
import { StatusFinished } from 'src/status-finished/statusFinished.entity';
import { StatusReceived } from 'src/status-received/statusReceived.entity';
import { StatusValidation } from 'src/status-validation/statusValidation.entity';
import { Users } from 'src/users/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tickets' })
export class Tickets {
  @PrimaryGeneratedColumn()
  id_tickets: number;

  @Column()
  department: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  createdAat: string;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  tpm_id: string;

  @Column()
  typeOfMaterial: string;

  @Column()
  shift: string;

  @Column()
  status: string;


  @Column()
  materialDescription: string;

  @Column()
  userOwner_ID: string;

  @OneToMany(() => StatusDevolution, statusDevolution => statusDevolution.ticket)
  statusDevolution: StatusDevolution[];

  @OneToMany(() => StatusReceived, statusReceived => statusReceived.ticket)
  statusReceived: StatusReceived[];

  @OneToMany(() => StatusFinished, statusFinished => statusFinished.ticket)
  statusFinished: StatusFinished[];

  @OneToMany(() => StatusValidation, statusValidation => statusValidation.ticket)
  statusValidation: StatusValidation[];
  
  @ManyToOne(() => Users, user => user.tickets)
  @JoinColumn({'name': 'userOwner_ID'})
  userOwner: Users
}
