import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { CourseModule } from 'src/course/course.module';
import { CartModule } from 'src/cart/cart.module';
//import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category, CourseModule, CartModule,])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}