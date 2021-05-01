import React from 'react';
import { Button } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { IDataTableColumn } from "react-data-table-component";
import { Book } from "../../types/Book";
import { F3Bookshelf } from "../../types/F3Bookshelf";
import './BooksTable.css';
import ModelDelete from "./ModelDelete";
import ReactDataTable from "./ReactDataTable";

interface MyProps {
}

interface MyState {
  books: Book[];
  bookTableColumns: IDataTableColumn[];
  bookshelf: F3Bookshelf;
  deleteBook: Book | undefined;
}

class BooksTable extends React.Component<MyProps, MyState> {
  
  constructor(props: MyProps) {
    super(props)
    this.state = {
      books: [],
      bookTableColumns: [
        {
          name: 'ID',
          selector: 'id',
          sortable: false,
          grow: 1,
        },
        {
          name: 'ISBN13',
          selector: 'isbn13',
          sortable: false,
          grow: 1,
        },
        {
          name: 'Title',
          selector: 'title',
          sortable: false,
          wrap: true,
          grow: 3,
        },
        {
          name: 'Authors',
          selector: 'authorsString',
          sortable: false,
          wrap: true,
          grow: 1,
        },
        {
          name: 'Shelf',
          selector: 'shelf',
          sortable: false,
          grow: 1,
        },
        {
          name: 'On Page',
          selector: 'onPage',
          sortable: false,
          hide: 'lg',
          grow: 1,
        },
        {
          name: 'Num Pages',
          selector: 'numPages',
          sortable: false,
          hide: 'lg',
          grow: 1,
        },
        {
          name: 'Date Started',
          selector: 'dateStartedFormatted',
          sortable: false,
          hide: 'lg',
          grow: 1,
        },
        {
          name: 'Date Finished',
          selector: 'dateFinishedFormatted',
          sortable: false,
          hide: 'lg',
          grow: 1,
        },
        {
          name: 'Rating',
          selector: 'rating',
          sortable: false,
          hide: 'lg',
          grow: 1,
        },
        {
          name: 'Actions',
          sortable: true,
          cell: (row: Book) => {
            return (
              <div className='actions-cell'>
                <Button variant="warning"><PencilSquare /></Button>
                <Button variant="danger" onClick={() => this.confirmDeleteBook(row.id)}><Trash /></Button>
              </div>
            )
          },
        },
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
    const localState = {...this.state};
    localState.books = books;
    this.setState(localState)
  }

  confirmDeleteBook(id: string) {
    const bookToDelete = this.state.books.find((b: Book) => b.id === id);
    const localState = {...this.state};
    localState.deleteBook = bookToDelete;
    this.setState(localState)
  }

  cancelDeleteBook() {
    const localState = {...this.state};
    localState.deleteBook = undefined;
    this.setState(localState)
  }

  async deleteBook(id: string) {
    const bookToDelete = this.state.books.find((b: Book) => b.id === id);
    if (!bookToDelete) {
      throw new Error('Attempting to delete book that was not found');
    }
    await this.state.bookshelf.delete(bookToDelete)
    const localState = {...this.state};
    localState.deleteBook = undefined;
    localState.books = localState.books.filter((b: Book) => b.id !== id);
    this.setState(localState)
  }

  componentDidMount() {
    this.loadBookshelf();
  }

  render() {
    return (
      <div className="books-table">
        {
          this.state.books.length === 0 &&
          <p>Loading...</p>
        }
        {
          this.state.books.length > 0 &&
          <ReactDataTable<Book>
            title='Books'
            columns={this.state.bookTableColumns}
            data={this.state.books}
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