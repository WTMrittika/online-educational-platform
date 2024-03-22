import { Module } from '@nestjs/common';
import { BookStoreService } from './book-store.service';
import { BookStoreController } from './book-store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookStore } from 'src/entities/book-store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookStore])],
  controllers: [BookStoreController],
  providers: [BookStoreService],
})
export class BookStoreModule {}
