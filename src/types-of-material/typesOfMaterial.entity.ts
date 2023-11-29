import { DescriptionOfMaterial } from 'src/description-of-material/descriptionOfMaterial.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'types' })
export class TypeOfMaterial {
  @PrimaryGeneratedColumn()
  id_type: number;

  @Column({ unique: true })
  name: string;

  @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @OneToMany(() => DescriptionOfMaterial, description => description.type)
  descriptions: DescriptionOfMaterial[]
}
