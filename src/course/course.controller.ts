import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('create')
  async create(@Body(ValidationPipe) createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);    
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':course_id')
  findOneByName(@Param('course_id', ParseIntPipe) course_id: number) {
    return this.courseService.findOneByName(course_id);
  }

  @Patch(':course_id') 
  async update(@Param('course_id', ParseIntPipe) course_id: number, @Body() updateCourseDto: UpdateCourseDto) {

    await this.courseService.update(course_id, updateCourseDto);
    return { message: 'The course updated successfully' };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
