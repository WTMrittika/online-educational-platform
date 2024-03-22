import {BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';
import { Category } from './category.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;
  
  @Column({ unique: true, nullable: false })
  course_id: number;

  @ManyToOne(() => Category, (category) => category.courses)
  category: Category;

  
}