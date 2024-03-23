import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard } from 'src/auth/admin.guard';
//import { AdminGuard } from 'src/auth/admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) 
  {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get(':username')
  @UseGuards(AdminGuard)
  findOneByUsername(@Param('username') username: string) { 
    return this.usersService.findByUsername(username);
  }

  @Get('profile/:username')
  //@UseGuards(AdminGuard)
  findByUsername(@Param('username') username: string) { 
    return this.usersService.seeProfile(username);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch('updateProfile/:username')
  @UsePipes(new ValidationPipe())
  async updateProfile(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateProfile(username, updateUserDto);
  }

  @Delete(':username')
  @UseGuards(AdminGuard)
  remove(@Param('user_email') username: string) {
    return this.usersService.remove(username);
  }
}
