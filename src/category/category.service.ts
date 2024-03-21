import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepo.create(createCategoryDto);
    return await this.categoryRepo.save(category);
  }

  async findAll() {
    return await this.categoryRepo.find({});
  }

  async findOneByName(category_name: string): Promise<Category | string> {
    const category = await this.categoryRepo.findOne({ where: { category_name: category_name } });
    if (!category) {
      return 'Category not found';
    }
    else
    return category;
  }

  async update(categoryName: string, updateCategoryDto: UpdateCategoryDto): Promise<void> {
    const category = await this.categoryRepo.findOne({ where: { category_name: categoryName } });
  
    if (!category) {
      throw new NotFoundException('Category not found'); 
    }
    await this.categoryRepo.update(category.id, updateCategoryDto);
  }
  
  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
