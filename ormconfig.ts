import { Cart } from 'src/entities/cart.entity';
import { Category} from './src/entities/category.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Course } from 'src/entities/course.entity';
import { BookStore } from 'src/entities/book-store.entity';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mrittika',
  entities: [Category, Cart, Course, BookStore],
  synchronize: true,
};

export default config;