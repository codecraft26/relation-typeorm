import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn,OneToMany, } from "typeorm";
import { Post } from "./post.entity";
@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: true })
    name: string;
    @Column({ nullable: true })
    email: string;
    @Column({ nullable: true })
    password: string;
    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];
}