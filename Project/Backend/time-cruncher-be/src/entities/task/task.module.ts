import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TypeOrmModule} from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskController } from './task.controller';
import { GroupService } from '../group/group.service';
import { Group } from '../group/group.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Group, User])],
  controllers: [TaskController],
  providers: [TaskService, GroupService, UserService],
  exports: [TaskService],
})
export class TaskModule {}
