import {BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn,
  } from 'typeorm';

  @Entity('categories')
  export class Category {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true, nullable: false })
    added_by: string;
    
    @Column({ unique: true, nullable: false })
    category_name: string;
  
    @Column({ unique: true, nullable: false })
    description: string;
  
  }
  