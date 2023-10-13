import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './Repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';
@Module({
  imports:[TypeOrmModule.forFeature([User,Post])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
