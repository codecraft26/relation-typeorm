import { Injectable,Post,Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { Group } from './entities/group.entity';
import { UserService } from './user.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    private readonly userService: UserService,
  ) {}

  async createGroup(name: string, createdByUser: User): Promise<Group> {
    const group = this.groupRepository.create({ name, admin: createdByUser, adminId: createdByUser.id });
    return this.groupRepository.save(group);
  }

  //add user to group
  async addUserToGroup(groupId: number, userId: number): Promise<Group | undefined> {
    const group = await this.groupRepository.findOne({where: { id: groupId }, relations: ['users']});

    if (!group) {
      return undefined;
    }

    const user = await this.userService.findUserById(userId);


    if (!user) {
      throw new NotFoundException('User not found');
    }

    group.users.push(user);

    return this.groupRepository.save(group);
  }
  async getUserCountInGroup(groupId: number): Promise<number> {
    const group = await this.groupRepository.findOne({where: { id: groupId }, relations: ['users']});

    if (!group) {
      return 0; // or throw an exception if the group doesn't exist
    }

    return group.users.length;
  }

  async getGroups(): Promise<Group[]> {
    return this.groupRepository.find({ relations: ['users'] });
  }
}