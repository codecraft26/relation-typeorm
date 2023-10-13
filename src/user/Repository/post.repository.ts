import {  EntityRepository, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { Post } from "../entities/post.entity";


EntityRepository(Post)

export class PostRepository extends Repository<Post>{
    
}