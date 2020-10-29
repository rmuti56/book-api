import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateRatingDto } from '../dto/update-rating.dto';
import { BookService } from '../services/book.service';

@Controller('books')
@ApiTags('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Get()
  getBooks() {
    return this.bookService.getBooks();
  }

  @Get(':bookId')
  getBookById(@Param('bookId') bookId: string) {
    return this.bookService.getBookById(bookId);
  }

  @Post()
  createPost(@Body() createBookDto: CreateBookDto) {
    return this.bookService.createBook(createBookDto);
  }

  @Put('detail/:bookId')
  updateBookDetail(
    @Param('bookId') bookId: string,
    @Body() updateBookDto: CreateBookDto,
  ) {
    return this.bookService.updateBookDetail(updateBookDto, bookId);
  }

  @Put('rating/:bookId')
  updateRating(
    @Param('bookId') bookId: string,
    @Body() updateRatingDto: UpdateRatingDto,
  ) {
    return this.bookService.updateRating(updateRatingDto.rating, bookId);
  }

  @Put('like/:bookId')
  likeBook(@Param('bookId') bookId: string) {
    return this.bookService.likeBook(bookId);
  }

  @Put('read/:bookId')
  readBook(@Param('bookId') bookId: string) {
    return this.bookService.readBook(bookId);
  }
}
