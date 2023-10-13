import { Body, Injectable} from '@nestjs/common';
import { Post } from './entities/post.entity';
import { UserRepository } from './Repository/user.repository';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create.dto';
import { PostRepository } from './Repository/post.repository';
import { Group } from './entities/group.entity';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository:UserRepository,
        @InjectRepository(Post)
        private readonly postRepository:PostRepository,
        ) { }


        async findUserGroups(userId: number): Promise<Group[]> {
          const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['groups']});
      
          if (!user) {
            return [];
          }
      
          return user.groups;
        }
       

        async create(createUserDto: CreateUserDto): Promise<User> {


            return await this.userRepository.save(createUserDto);
        }

        async findAll(): Promise<User[]> {
            return await this.userRepository.find();
        }
        async findUserById(id: number): Promise<User> {
            return await this.userRepository.findOne({where:{id:id}});
        }




        async createPost(userId: number, postData: Partial<Post>): Promise<Post> {
            // Find the user by their ID
            const user = await this.userRepository.findOne({where:{id:userId}});
        
            if (!user) {
              throw new Error('User not found');
            }
        
            // Create a new post associated with the user
            const post = this.postRepository.create({
              ...postData,
              user, // Assign the user to the post
            });
        
            return this.postRepository.save(post);
        }



        
        async getUserPosts(userId: number): Promise<Post[]> {
          const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['posts']});
      
          if (!user) {
            throw new Error('User not found');
          }
      
          return user.posts;
        }
        

}
