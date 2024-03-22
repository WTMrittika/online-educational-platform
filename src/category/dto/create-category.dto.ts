import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateCartDto } from 'src/cart/dto/create-cart.dto';
import { CreateCourseDto } from 'src/course/dto/create-course.dto';

export class CreateCategoryDto {
  id: number;

  @IsString({ message: 'valid user name is required' })
  @IsNotEmpty()
  added_by: string;

  @IsString({ message: 'valid category name is required' })
  @IsNotEmpty()
  category_name: string;

  @IsString()
  description: string;

  courses: CreateCourseDto[];
  carts: CreateCartDto[];
}