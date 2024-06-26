import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  imports:[ TypeOrmModule.forFeature([User]), UsersModule, 
  JwtModule.register({ secret:'mysecret18', global: true, 
  signOptions: { expiresIn: '1h' },
})],
  controllers: [AuthController],
  providers: [AuthService, UsersService,],
  exports: [AuthService]
})
export class AuthModule {}