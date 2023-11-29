import { Bussiness } from 'src/bussiness/bussiness.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tools' })
export class Tools {
  @PrimaryGeneratedColumn()
  id_tools: number;

  @Column({ unique: true })
  name: string;

  @Column()
  url: string;

  @Column()
  icon: string;

  @Column()
  for_bussiness_ID: number;

  @ManyToOne(() => Bussiness, bussiness => bussiness.tools)
  @JoinColumn({ name: 'for_bussiness_ID' })
  for_bussiness: Bussiness
}

