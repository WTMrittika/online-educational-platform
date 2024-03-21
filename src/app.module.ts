import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import config from 'ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [TypeOrmModule.forRoot(config),CategoryModule, CartModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
