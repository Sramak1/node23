import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UserModule} from "../user/user.module";
import {UserService} from "../user/user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {user} from "../entities/user.entity";
import {LocalStrategy} from "./strategies/local.strategy";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports:[UserModule,TypeOrmModule.forFeature([user]), JwtModule.register({secret: jwtConstants.secret, signOptions: { expiresIn: '60s' },}),],
  controllers: [AuthController],
  providers: [AuthService,UserService,LocalStrategy]
})
export class AuthModule {}
