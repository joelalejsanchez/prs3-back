import { Injectable } from '@nestjs/common';
import { Book } from './book.model';

@Injectable()
export class BooksService {
  private books: Book[] = [];
  private nextId = 1;

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book | undefined {
    return this.books.find((book) => book.id === id);
  }

  create(bookData: Omit<Book, 'id'>): Book {
    const newBook: Book = { id: this.nextId++, ...bookData };
    this.books.push(newBook);
    return newBook;
  }

  update(id: number, bookData: Partial<Omit<Book, 'id'>>): Book | undefined {
    const book = this.findOne(id);
    if (!book) return undefined;
    Object.assign(book, bookData);
    return book;
  }

  remove(id: number): boolean {
    const index = this.books.findIndex((book) => book.id === id);
    if (index === -1) return false;
    this.books.splice(index, 1);
    return true;
  }
}
