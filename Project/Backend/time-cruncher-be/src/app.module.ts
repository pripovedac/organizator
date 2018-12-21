import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UserController } from './entities/user/user.controller';
import { UserService } from './entities/user/user.service';
import { UserModule } from './entities/user/user.module';
import { GroupController } from './entities/group/group.controller';
import { TaskController } from './entities/task/task.controller';
import { GroupModule } from './entities/group/group.module';
import { TaskModule } from './entities/task/task.module';
import { UserIdController } from './entities/user/user-id/user-id.controller';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, GroupModule, TaskModule],
  controllers: [AppController, UserController, GroupController, TaskController, UserIdController],
  providers: [AppService, UserService],
})
export class AppModule {}
