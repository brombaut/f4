import { FirestoreDate, FirestoreDateTranslator } from "firebase-firestore-facade";
import React, { ChangeEvent, FormEvent } from "react";
import { Button, Form } from "react-bootstrap";
import { F3Bookshelf } from "../../types/F3Bookshelf";
import { FirestoreBook } from "../../types/FirestoreBook";
import { Shelf } from "../../types/Shelf";
import "./BulkAdd.css"

interface MyProps {
}

interface MyState {
  value: string;
}

type BulkAddBook = {
  "title": string;
  "short_title": string;
  "authors": string;
  "isbn13": string;
  "link": string;
  "num_pages": string;
  "dateStarted": string | null;
  "dateFinished": string | null;
  "rating": string;
  "shelf": Shelf;
}

const s = `
[
  {
    "title": "Grokking Algorithms An Illustrated Guide For Programmers and Other Curious People",
    "short_title": "Grokking Algorithms An Illustrated Guide For Programmers and Other Curious People",
    "authors": "Aditya Y. Bhargava",
    "isbn13": "9781617292231",
    "link": "https://www.goodreads.com/book/show/22847284-grokking-algorithms-an-illustrated-guide-for-programmers-and-other-curio",
    "num_pages": "256",
    "dateStarted": null,
    "dateFinished": "Wed May 01 00:00:00 -0700 2019",
    "rating": "4",
    "shelf": "read"
  },
  {
    "title": "The C Programming Language",
    "short_title": "The C Programming Language",
    "authors": "Brian W. Kernighan",
    "isbn13": "9780131103627",
    "link": "https://www.goodreads.com/book/show/515601.The_C_Programming_Language",
    "num_pages": "288",
    "dateStarted": null,
    "dateFinished": "Sun Sep 01 00:00:00 -0700 2019",
    "rating": "4",
    "shelf": "read"
  },
  {
    "title": "The Pragmatic Programmer: From Journeyman to Master",
    "short_title": "The Pragmatic Programmer: From Journeyman to Master",
    "authors": "Andy Hunt",
    "isbn13": "9780201616224",
    "link": "https://www.goodreads.com/book/show/4099.The_Pragmatic_Programmer",
    "num_pages": "321",
    "dateStarted": null,
    "dateFinished": "Tue Jan 01 00:00:00 -0800 2019",
    "rating": "5",
    "shelf": "read"
  }
]
`;

class BulkAdd extends React.Component<MyProps, MyState> {

  constructor(props: MyProps) {
    super(props);
    this.state = {
      value: s
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    this.setState({value: event.target.value});
  }

  async handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const jsonGoodreadsBooks = JSON.parse(this.state.value);
    const firestoreBooks = jsonGoodreadsBooks.map(this.translateBulkAddBookToFirestoreBook);
    const bookshelf = new F3Bookshelf();
    // TODO: Show success and error messages
    for(const fsb of firestoreBooks) {
      try {
        const newBook = await bookshelf.post(fsb);
        console.log(newBook);
      } catch (e) {
        console.error(e);
      }
    }
  }

  translateBulkAddBookToFirestoreBook(bab: BulkAddBook): FirestoreBook {
    let sDate: FirestoreDate | null = null;
      try {
        if (bab.dateStarted) {
          sDate = new FirestoreDateTranslator().fromDate(new Date(bab.dateStarted)).toFirestoreDate();
        }
      } catch {}
      let fDate: FirestoreDate | null = null;
      try {
        if (bab.dateFinished) {
          fDate = new FirestoreDateTranslator().fromDate(new Date(bab.dateFinished)).toFirestoreDate();
        }
      } catch {}
      let onPage = 0;
      if ( bab.shelf === Shelf.READ) {
        onPage = parseInt(bab.num_pages);
      }
      const firestoreBook: FirestoreBook = {
        id: '',
        isbn13: bab.isbn13,
        title: bab.title,
        shortTitle: bab.short_title,
        authors: [bab.authors],
        numPages: parseInt(bab.num_pages),
        link: bab.link,
        shelf: bab.shelf,
        onPage: onPage,
        dateStarted: sDate,
        dateFinished: fDate,
        rating: parseInt(bab.rating),
      };
      return firestoreBook
  }
  
  render() {
    return (
      <div>
        <h1>Bulk Add</h1>
        <Form className="bulk-add-form" onSubmit={this.handleSubmit}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Goodreads Book JSON</Form.Label>
            <Form.Control as="textarea" rows={10} value={this.state.value} onChange={this.handleChange}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }

}

export default BulkAdd;