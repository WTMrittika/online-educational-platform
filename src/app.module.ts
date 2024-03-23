import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import config from 'ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from './cart/cart.module';
import { CourseModule } from './course/course.module';
import { BookStoreModule } from './book-store/book-store.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(config),CategoryModule, CartModule, CourseModule, BookStoreModule, UsersModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
