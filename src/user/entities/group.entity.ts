import { Entity, PrimaryGeneratedColumn, Column,OneToMany, ManyToOne, JoinColumn ,ManyToMany,JoinTable} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity("groups")
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'adminId' })
  admin: User;

  @Column({ nullable: true })
  adminId: number;
  @ManyToMany(() => User, (user) => user.groups, { eager: true })
  @JoinTable()
  users: User[];

  @OneToMany(() => Post, post => post.group)
  posts: Post[];



}