import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {user} from "../entities/user.entity";
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([user])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
