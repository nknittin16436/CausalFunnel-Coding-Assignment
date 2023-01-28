import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"
@Entity()
export class Blog extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    createdAt: number

}