import React from 'react';
import { Table } from "react-bootstrap";
import { Book } from "../../types/Book";
import { F3Bookshelf } from "../../types/F3Bookshelf";


interface MyProps {
  // books: Book[];
}

interface MyState {
  books: Book[];
  tableHeaders: string[];
}

class BooksTable extends React.Component<MyProps, MyState> {
  
  constructor(props: MyProps) {
    super(props)
    this.state = {
      books: [],
      tableHeaders: [
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
      ]
    }
  }

  async loadBookshelf(that: BooksTable) {
    const bookshelf = new F3Bookshelf();
    console.log(bookshelf);
  
    const books: Book[] = await bookshelf.get();
    console.log(books);
    that.setState({
      books: books
    })
  }

  componentDidMount() {
    this.loadBookshelf(this);
  }

  renderTableHeader() {
    let headers = this.state.tableHeaders;
    return headers.map((key: string, index: number) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  renderTableData() {
    return this.state.books.map((book: Book) => {
        return (
          <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.isbn13}</td>
            <td>{book.title}</td>
            <td>{book.authors.join(', ')}</td>
            <td>{book.numPages}</td>
            <td>{book.shelf}</td>
            <td>{book.onPage}</td>
            <td>{book.dateStarted?.getFullYear}</td>
            <td>{book.dateFinished?.getFullYear}</td>
            <td>{book.rating}</td>
          </tr>
        )
    })
  }

 render() {
  return (
    <div>
      <h1>Books</h1>
      <Table striped bordered hover responsive size="sm" id='books-table'>
        <thead>
          <tr>{this.renderTableHeader()}</tr>
        </thead>
        <tbody>
          {this.renderTableData()}
        </tbody>
      </Table>
    </div>
  )
 }
}

export default BooksTable;