import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository} from "typeorm";
import {Blog} from "../entities/blog.entity";

@Injectable()
export class BlogService {
  constructor(@InjectRepository(Blog) private blogReposetory: Repository<Blog>) {
  }

    async create(user_id:number,createBlogDto:CreateBlogDto){
    const data = {...createBlogDto, user:{id:user_id}, category:{id:createBlogDto.category_id}};
    const blog = this.blogReposetory.create(data);
    return await this.blogReposetory.save(blog);
}
  async findAll():Promise<Blog[]> {
    return
   await this.blogReposetory.find();
  }

  async findOne(id: number):Promise<Blog> {
    return await this.blogReposetory.findOne({where:{id},relations:['user']});
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    await this.blogReposetory.update(id,updateBlogDto);
    return this.findOne(id);
  }

  remove(id: number):Promise<DeleteResult> {
    return this.blogReposetory.delete(id);
  }
}
