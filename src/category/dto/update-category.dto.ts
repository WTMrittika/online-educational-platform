import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  id: number;

  @IsString({ message: 'valid user name is required' })
  @IsNotEmpty()
  added_by: string;

  @IsString({ message: 'valid category name is required' })
  @IsNotEmpty()
  category_name: string;

  @IsString()
  description: string;
}