import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './Repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';
import { Group } from './entities/group.entity';
import { GroupsService } from './group.service';
@Module({
  imports:[TypeOrmModule.forFeature([User,Post,Group])],
  controllers: [UserController],
  providers: [UserService,GroupsService,],
})
export class UserModule {}
