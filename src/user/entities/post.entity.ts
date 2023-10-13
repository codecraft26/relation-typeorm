import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Group } from "./group.entity";
@Entity('posts')
export class Post{
            
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: true })
    title: string;
    @Column({ nullable: true })
    description: string;
    @ManyToOne(() => User, (user) => user.posts)
    user: User;
    @ManyToOne(() => Group, group => group.posts)
    group: Group;
}
