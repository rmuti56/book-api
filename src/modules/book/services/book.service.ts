import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from '../dto/create-book.dto';

import { BookRepository } from '../repositories/book.repository';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
  ) {}
  async createBook(createBookDto: CreateBookDto) {
    const { title, description, price, stock, imageUrl } = createBookDto;
    const book = this.bookRepository.create({
      title,
      description,
      price,
      stock,
      imageUrl,
    });
    return await this.bookRepository.save(book);
  }

  async getBooks() {
    return await this.bookRepository.find();
  }

  async getBookById(bookId: string) {
    const book = await this.bookRepository.findOne(bookId);
    if (!book) {
      throw new NotFoundException('bookNotExist');
    }
    return book;
  }

  async updateBookDetail(updateBookDto: CreateBookDto, bookId: string) {
    const book = await this.getBookById(bookId);
    const { title, description, price, stock, imageUrl } = updateBookDto;
    return await this.bookRepository.save({
      ...book,
      title,
      description,
      price,
      stock,
      imageUrl,
    });
  }

  async likeBook(bookId: string) {
    const book = await this.getBookById(bookId);
    book.totalLike = book.totalLike + 1;
    return await this.bookRepository.save(book);
  }

  async updateRating(rating: number, bookId: string) {
    const book = await this.getBookById(bookId);
    if (book.rating !== null || book.rating !== undefined) {
      const newTotalPoint = book.totalPoint + rating;
      const newTotalVote = book.totalVote + 1;
      const newRating = newTotalPoint / newTotalVote;
      book.totalVote = newTotalVote;
      book.totalPoint = newTotalPoint;
      book.rating = newRating;
    } else {
      book.rating = rating;
      book.totalVote = 1;
      book.totalPoint = rating;
    }

    return await this.bookRepository.save(book);
  }

  async readBook(bookId: string) {
    const book = await this.getBookById(bookId);
    book.totalRead = book.totalRead + 1;
    return await this.bookRepository.save(book);
  }
}
