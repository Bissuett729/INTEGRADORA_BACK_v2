import { Tools } from 'src/tools/tools.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'bussiness' })
export class Bussiness {
  @PrimaryGeneratedColumn()
  id_bussiness: number;

  @Column({ unique: true })
  name: string;

  @Column()
  url: string;

  @Column()
  icon: string;

  @OneToMany(() => Tools, tools => tools.for_bussiness)
  tools: Tools[]
}
