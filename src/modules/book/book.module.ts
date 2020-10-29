import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookController } from './controllers/book.controller';
import { BookRepository } from './repositories/book.repository';
import { BookService } from './services/book.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookRepository])],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
