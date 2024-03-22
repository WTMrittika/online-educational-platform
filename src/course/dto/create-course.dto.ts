import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
  id: number;

  @IsString({ message: 'valid title is required' })
  @IsNotEmpty()
  title: string;

  @IsNumber({}, { message: 'valid course id is required' })
  @IsNotEmpty()
  course_id: number;

  @IsNotEmpty()
  categoryId: number;
}
