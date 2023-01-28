import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinTable, UpdateDateColumn, Generated, PrimaryColumn } from "typeorm"
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column({ nullable: false, unique: true })
    email: string

    @Column()
    password: string

    @Column({ nullable: true })
    resetPasswordToken: string

    @Column({ nullable: true })
    resetPasswordExpire: number

}