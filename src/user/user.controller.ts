import { Body, Controller, Get,Post} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Param } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Post( )
  create(@Body() createUserDto: User): Promise<User> {
    return this.userService.create(createUserDto);
  }
@Get('all')
async findAllUsers(): Promise<User[]> {

    return await this.userService.findAll();
  }


  @Post('post/:userId')
  async createPost(@Param('userId') userId: number, @Body() createPostDto: CreatePostDto) {
    const post = await this.userService.createPost(userId, createPostDto);

    if (!post) {
      throw new NotFoundException('User not found');
    }

    return post;
  }

  @Get('post/:userId')
  async getUserPosts(@Param('userId') userId: number) {
    const posts = await this.userService.getUserPosts(userId);

    if (!posts) {
      throw new NotFoundException('User not found');
    }

   return posts;
  }

 
}
