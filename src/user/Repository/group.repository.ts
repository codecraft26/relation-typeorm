import {  EntityRepository, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { Post } from "../entities/post.entity";
import { Group } from "../entities/group.entity";


EntityRepository(Group)

export class GroupRepository extends Repository<Group>{
    
}