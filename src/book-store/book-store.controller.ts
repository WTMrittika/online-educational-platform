import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseInterceptors, UploadedFile, Res, StreamableFile } from '@nestjs/common';
import { BookStoreService } from './book-store.service';
import { CreateBookStoreDto } from './dto/create-book-store.dto';
import { UpdateBookStoreDto } from './dto/update-book-store.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { join } from 'path';
import type { Response } from 'express';

@Controller('book-store')
export class BookStoreController {
  constructor(private readonly bookStoreService: BookStoreService) {}

  @Post('create')
  async create(@Body(ValidationPipe) createBookStoreDto: CreateBookStoreDto) {
    return this.bookStoreService.create(createBookStoreDto);    
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/\.(jpg|webp|png|jpeg|pdf)$/)) {
          cb(null, true);
        } else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 3000000000 },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  ) 
  uploadFile(@UploadedFile() file:Express.Multer.File) {
    console.log(file);
    return { message: "File Upload", file: file.filename };
  }

  @Get('/download/:filename')
  async downloadFile(@Param('filename') filename: string, @Res() res: Response): Promise<void> {
    await this.bookStoreService.downloadFile(filename, res);
  }

  @Get()
  findAll() {
    return this.bookStoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookStoreService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookStoreDto: UpdateBookStoreDto) {
    await this.bookStoreService.update(+id, updateBookStoreDto);
    return { message: 'The book has been updated successfully' };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookStoreService.remove(+id);
  }
}
