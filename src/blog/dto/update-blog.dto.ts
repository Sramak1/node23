import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';

import {IsEmail, IsNotEmpty, IsOptional, MinLength} from 'class-validator';
export class UpdateBlogDto{
    @IsOptional()
    title?: string;

    @IsOptional()
    content?:string;

    @IsOptional()
    category_id?:number;

}