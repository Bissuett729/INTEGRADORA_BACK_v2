import { Tickets } from 'src/tickets/tickets.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'

@Entity({name: 'users'})
export class Users {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column({nullable: true})
    role: string

    @Column({unique: true})
    clock: string

    @Column({nullable: true})
    email: string

    @Column()
    authorized: boolean
    
    @Column()
    first_time: boolean
    
    @Column()
    password: string
    
    @Column({nullable: true})
    img_profile: string
    
    @Column({nullable: true, type: 'date'})
    birthday: Date
    
    @Column({nullable: true})
    boss: string
    
    @Column({nullable: true})
    phone: string
    
    @Column({nullable: true})
    department: string
    
    @Column({nullable: true})
    role_position: string
    
    @Column({nullable: true})
    shift: string

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: true})
    createdAt: Date

    @OneToMany(()=> Tickets, tickets => tickets.userOwner)
    tickets: Tickets[]
}