import { Body, Controller, Get,Post} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Param } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { GroupsService } from './group.service';
import { Group } from './entities/group.entity';
@Controller('user')
export class UserController {
  constructor(
    
    private readonly userService: UserService,
    private readonly groupService: GroupsService,
    
    ) {}

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
  @Get(':userId/groups')
  async findUserGroups(@Param('userId') userId: number): Promise<Group[]> {
    const userGroups = await this.userService.findUserGroups(userId);

    if (!userGroups) {
      throw new NotFoundException('User not found');
    }

    return userGroups;
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

  //post methods controller

  @Get('post/:userId')
  async getUserPosts(@Param('userId') userId: number) {
    const posts = await this.userService.getUserPosts(userId);

    if (!posts) {
      throw new NotFoundException('User not found');
    }

   return posts;
  }




  // group controller

 
  @Post("group/create")
  async createGroup(@Body() createGroupDto: { name: string, createdByUserId: number }): Promise<Group> {
    const { name, createdByUserId } = createGroupDto;

    const createdByUser = await this.userService.findUserById(createdByUserId);
    if (!createdByUser) {
      throw new NotFoundException('User not found');
    }

    return this.groupService.createGroup(name, createdByUser);
  }

  // add user to group
  @Post('group/:groupId/user/:userId')
  async addUserToGroup(@Param('groupId') groupId: number, @Param('userId') userId: number): Promise<Group | undefined> {
    return this.groupService.addUserToGroup(groupId, userId);
  }

  @Get(':groupId/user-count')
  async getUserCountInGroup(@Param('groupId') groupId: number): Promise<number> {
    const userCount = await this.groupService.getUserCountInGroup(groupId);

    if (userCount === 0) {
      throw new NotFoundException('no user');
    }

    return userCount;
  }


  //get all groups
  @Get('group/all')
  async getGroups(): Promise<Group[]> {
    return this.groupService.getGroups();
  }


  




















 
}
