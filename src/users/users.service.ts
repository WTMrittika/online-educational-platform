import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user=this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }

  async findAll() {
    return this.userRepo.find();
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { username } });
  }

  async seeProfile(username: string): Promise<User | undefined> {
    return this.userRepo.createQueryBuilder('user')
      .where('user.username = :username', { username })
      .select(['user.username', 'user.email', 'user.id', 'user.role'])
      .getOne();
}

  findOne(id: number) {
    return this.userRepo.findOne({where:{id: id}});
  }

  async updateProfile(username: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }
    if (updateUserDto.password) {
      user.password = updateUserDto.password;
    }
    return this.userRepo.save(user);
  }

  async remove(username: string) {
    const user = await this.findByUsername(username);
    if (!user) {
      throw new NotFoundException(`Registration with email ${username} not found.`);
    }
    return await this.userRepo.remove(user);
  }
}