import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
    @IsString({ message: 'valid title is required' })
    @IsNotEmpty()
    title: string;
  
    @IsNumber({}, { message: 'valid course id is required' })
    @IsNotEmpty()
    course_id: number;
  
    @IsString({ message: 'valid category name is required' })
    @IsNotEmpty()
    category_name: string;
}