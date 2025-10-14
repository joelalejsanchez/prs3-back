import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { BooksService } from './books.service';
import type { Book } from './book.model';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAll(): Book[] {
    return this.booksService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Book {
    const book = this.booksService.findOne(Number(id));
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  @Post()
  create(@Body() bookData: Omit<Book, 'id'>): Book {
    return this.booksService.create(bookData);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() bookData: Partial<Omit<Book, 'id'>>,
  ): Book {
    const updated = this.booksService.update(Number(id), bookData);
    if (!updated) throw new NotFoundException('Book not found');
    return updated;
  }

  @Delete(':id')
  remove(@Param('id') id: string): { deleted: boolean } {
    const deleted = this.booksService.remove(Number(id));
    if (!deleted) throw new NotFoundException('Book not found');
    return { deleted };
  }
}
