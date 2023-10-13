import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserRepository } from './user/Repository/user.repository';
import { User } from './user/entities/user.entity';
import { Post } from './user/entities/post.entity';
import { Group } from './user/entities/group.entity';

@Module({
  imports: [UserRepository,  TypeOrmModule.forRoot({
    type: 'postgres'
    ,
    host:'localhost',
    port: 5433

    

    , username: 'postgres'
    ,
    password: "niteg"
    ,
    database: "Test"
    ,
    
    entities: [Post,User,Group],
    
  
    
 synchronize:true      
  }), UserModule

  
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
