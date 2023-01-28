import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,OneToMany ,JoinTable} from "typeorm"
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column({nullable:false,unique:true})
    email: string

    @Column()
    password: string

}