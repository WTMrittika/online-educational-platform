import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  async create(@Body(ValidationPipe) createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);    
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':categoryName')
  findOneByName(@Param('categoryName') categoryName: string) {
  return this.categoryService.findOneByName(categoryName);
  }

  @Patch(':categoryName') 
async update(
  @Param('categoryName') categoryName: string,
  @Body() updateCategoryDto: UpdateCategoryDto,
) {
  await this.categoryService.update(categoryName, updateCategoryDto);
  return { message: 'The category updated successfully' };
}



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
