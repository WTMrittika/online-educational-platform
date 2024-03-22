import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from 'src/entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private readonly courseRepo: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const { categoryId, ...courseData } = createCourseDto;
    const course = this.courseRepo.create({
      ...courseData,
      category: { id: categoryId },
    });

    return await this.courseRepo.save(course);
  }

  async findAll(){
    return await this.courseRepo.find({});
  }

  async findOneByName(course_id: number): Promise<Course> {
    const course = await this.courseRepo.findOne({ where: { id: course_id } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  async update(course_id: number, updateCourseDto: UpdateCourseDto): Promise<number> {
    const course = await this.courseRepo.findOne({ where: { id: course_id } });
  
    if (!course) {
      throw new NotFoundException('Course not found'); 
    }
    await this.courseRepo.update(course.id, updateCourseDto);
    
    return course.id; 
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
