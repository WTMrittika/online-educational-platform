import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import config from 'ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from './cart/cart.module';
import { CourseModule } from './course/course.module';
import { BookStoreModule } from './book-store/book-store.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './middleware/auth.middleware';
import { LandingPageModule } from './landing-page/landing-page.module';

@Module({
  imports: [TypeOrmModule.forRoot(config),CategoryModule, CartModule, CourseModule, 
            BookStoreModule, UsersModule, AuthModule, LandingPageModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('Users', 'Category', /*'BookStore'*/);
  }
}
