import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookStoreDto } from './dto/create-book-store.dto';
import { UpdateBookStoreDto } from './dto/update-book-store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookStore } from 'src/entities/book-store.entity';
import { createReadStream, createWriteStream, existsSync, mkdirSync } from 'fs';
import type { Response } from 'express';
import { join } from 'path';


@Injectable()
export class BookStoreService {
  constructor(
    @InjectRepository(BookStore) private readonly bookStoreRepo: Repository<BookStore>,
  ){}
  
  async create(createBookStoreDto: CreateBookStoreDto) {
    const book = this.bookStoreRepo.create(createBookStoreDto);
    return await this.bookStoreRepo.save(book);
  }

  async findAll() {
    return await this.bookStoreRepo.find({});
  }

  async downloadFile(filename: string, res: Response): Promise<void> {
    const uploadsFolderPath = join(process.cwd(), 'uploads');
    const downloadsFolderPath = join(process.cwd(), 'downloads');

    if (!existsSync(downloadsFolderPath)) {
      mkdirSync(downloadsFolderPath);
    }

    const sourceFilePath = join(uploadsFolderPath, filename);
    const destinationFilePath = join(downloadsFolderPath, filename);
    const fileStream = createReadStream(sourceFilePath);

    res.set({
      'Content-Type': 'application/octet-stream', 
      'Content-Disposition': `attachment; filename="${filename}"`,
    });

    fileStream.pipe(createWriteStream(destinationFilePath));
    fileStream.pipe(res);
  }
  
  async findOneByName(course_id: number): Promise<BookStore> {
    const course = await this.bookStoreRepo.findOne({ where: { id: course_id } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  async update(id: number, updateBookStoreDto: UpdateBookStoreDto): Promise<void> {
    const book = await this.bookStoreRepo.findOne({ where: { id: id } });
    
    if (!book) {
      throw new NotFoundException('Book not found'); 
    }
    await this.bookStoreRepo.update(id, updateBookStoreDto);
  }

  remove(id: number) {
    return `This action removes a #${id} bookStore`;
  }
}
