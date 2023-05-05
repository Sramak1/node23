import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../entities/user.entity'
import {DeleteResult, Repository} from "typeorm";
import {createUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {

    }
    async findAll(): Promise<User[]>{
        return  this.userRepository.find();
    }
    async create(CreateUserDto: createUserDto): Promise<User>{
        const hashed = await bcrypt.hash(CreateUserDto.password,10);
        const data = {...CreateUserDto,password:hashed};
        const newUser =  this.userRepository.create(data);
        return this.userRepository.save(newUser);

    }
    async delete(id:number):Promise<DeleteResult>{
        return this.userRepository.delete(id);
    }
    async findById(id:number):Promise<User>{
        return this.userRepository.findOneBy({id});
    }
    async findByEmail(email:string):Promise<User>{
        return this.userRepository.findOneBy({email});
    }

    async update(id:number,updateUserDto:UpdateUserDto):Promise<User>{
        await this.userRepository.update(id,updateUserDto);
        return this.findById(id);
    }
}
