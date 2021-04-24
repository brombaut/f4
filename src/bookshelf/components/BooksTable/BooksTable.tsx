import React from 'react';
import { Book } from "../../types/Book";
import { F3Bookshelf } from "../../types/F3Bookshelf";
import F4Table from "./F4Table";
import './BooksTable.css';
import ModelDelete from "./ModelDelete";

interface MyProps {
}

interface MyState {
  books: Book[];
  bookRows: string[][];
  bookHeaders: string[];
  bookshelf: F3Bookshelf;
  deleteBook: Book | undefined;
}

class BooksTable extends React.Component<MyProps, MyState> {
  
  constructor(props: MyProps) {
    super(props)
    this.state = {
      books: [],
      bookRows: [],
      bookHeaders: [
        'id',
        'isbn13',
        'title',
        'authors',
        'numPages',
        'shelf',
        'onPage',
        'dateStarted',
        'dateFinished',
        'rating',
      ],
      bookshelf: new F3Bookshelf(),
      deleteBook: undefined,
    }
    this.loadBookshelf = this.loadBookshelf.bind(this);
    this.confirmDeleteBook = this.confirmDeleteBook.bind(this);
    this.cancelDeleteBook = this.cancelDeleteBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
  }

  async loadBookshelf() {
    const books: Book[] = await this.state.bookshelf.get();
    const bookRows: string[][] = this.buildBookRows(books);
    const localState = {...this.state};
    localState.books = books;
    localState.bookRows = bookRows;
    this.setState(localState)
  }

  buildBookRows(books: Book[]): string[][] {
    const bookRows: string[][] = books.map((book: Book) => {
      const formatDate = (d: Date | null) => {
        if (!d) {
          return null
        }
        return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
      }
      const row = [
        `${book.id}`,
        `${book.isbn13}`,
        `${book.title}`,
        `${book.authors.join(', ')}`,
        `${book.numPages}`,
        `${book.shelf}`,
        `${book.onPage}`,
        `${formatDate(book.dateStarted)}`,
        `${formatDate(book.dateFinished)}`,
        `${book.rating}`,
      ];
      return row;
    });
    return bookRows;
  }

  confirmDeleteBook(id: string) {
    const bookToDelete = this.state.books.find((b: Book) => b.id === id);
    const localState = {...this.state};
    localState.deleteBook = bookToDelete;
    this.setState(localState)
  }

  cancelDeleteBook() {
    console.log('CANCEL');
    const localState = {...this.state};
    localState.deleteBook = undefined;
    this.setState(localState)
  }

  async deleteBook(id: string) {
    console.log('delete');
    const bookToDelete = this.state.books.find((b: Book) => b.id === id);
    if (!bookToDelete) {
      throw new Error('Attempting to delete book that was not found');
    }
    await this.state.bookshelf.delete(bookToDelete)
    const localState = {...this.state};
    localState.deleteBook = undefined;
    localState.books = localState.books.filter((b: Book) => b.id !== id);
    localState.bookRows = this.buildBookRows(localState.books);
    this.setState(localState)
  }

  componentDidMount() {
    this.loadBookshelf();
  }

  render() {
    return (
      <div className="books-table">
        <h1>Books</h1>
        {
          this.state.bookRows.length === 0 &&
          <p>Loading...</p>
        }
        {
          this.state.bookRows.length > 0 &&
          <F4Table
            headers={this.state.bookHeaders}
            rows={this.state.bookRows}
            deleteCallback={this.confirmDeleteBook}
            />
        }
        {
          !!this.state.deleteBook &&
          <ModelDelete 
            show={!!this.state.deleteBook}
            entityId={this.state.deleteBook.id}
            deleteMessage={`${this.state.deleteBook.id} - ${this.state.deleteBook.isbn13} - ${this.state.deleteBook.title}`}
            cancelCallback={this.cancelDeleteBook}
            confirmCallback={this.deleteBook}
            />
        }
      </div>
    )
  }
}

export default BooksTable;