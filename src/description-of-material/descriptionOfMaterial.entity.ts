import { TypeOfMaterial } from 'src/types-of-material/typesOfMaterial.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'descriptions' })
export class DescriptionOfMaterial {
  @PrimaryGeneratedColumn()
  id_description: number;

  @Column({ unique: true })
  description: string;

  @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @Column()
  id_type: number;

  @ManyToOne(() => TypeOfMaterial, type => type.descriptions)
  @JoinColumn({name: 'id_type'})
  type: TypeOfMaterial
}
