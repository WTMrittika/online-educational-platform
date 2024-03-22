import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('bookstore')
export class BookStore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  title: string;

  @Column({ nullable: false })
  image: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  category: string;

  @Column({ nullable: false })
  publication: string;

  @Column({ nullable: false })
  stock: number;

  @Column({ nullable: false })
  price: number;

  @Column({ type: 'date', nullable: false })
  publicationDate: Date;
}
