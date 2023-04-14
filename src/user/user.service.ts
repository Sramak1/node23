import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {user} from '../entities/user.entity'
import {DeleteResult, Repository} from "typeorm";
import {createUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
@Injectable()
export class UserService {
    constructor(@InjectRepository(user) private readonly userRepository: Repository<user>) {

    }
    async findAll(): Promise<user[]>{
        return  this.userRepository.find();
    }
    async create(CreateUserDto: createUserDto): Promise<user>{
        const newUser =  this.userRepository.create(CreateUserDto);
        return this.userRepository.save(newUser);

    }
    async delete(id:number):Promise<DeleteResult>{
        return this.userRepository.delete(id);
    }
    async findById(id:number):Promise<user>{
        return this.userRepository.findOneBy({id});
    }
    async findByEmail(email:string):Promise<user>{
        return this.userRepository.findOneBy({email});
    }

    async update(id:number,updateUserDto:UpdateUserDto):Promise<user>{
        await this.userRepository.update(id,updateUserDto);
        return this.findById(id);
    }
}
