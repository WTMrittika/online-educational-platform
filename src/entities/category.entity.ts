import {BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Course } from './course.entity';
import { Cart } from './cart.entity';

  @Entity('categories')
  export class Category {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true, nullable: false })
    added_by: string;
    
    @Column({ unique: true, nullable: false })
    category_name: string;

    @Column({ nullable: false })
    description: string;
  
    @OneToMany(() => Course, (course) => course.category, {
      cascade: true,
    })
    courses: Course[];

    @OneToMany(() => Cart, (cart) => cart.category, {
      cascade: true,
    })
    carts: Cart[];
  }
  