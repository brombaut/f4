import React, { FormEvent } from 'react';
import { Button, Col, Container, Form } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { IDataTableColumn } from "react-data-table-component";
import ReactDataTable from "../Tables/ReactDataTable";
import './Collections.css';

interface CollectionPath {
  path: string;
}

interface MyProps {
}

interface MyState {
  collectionPaths: CollectionPath[];
  collectionsTableColumns: IDataTableColumn[];
}

class Collections extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.handleAddCollectionPath = this.handleAddCollectionPath.bind(this);
    this.state = {
      collectionPaths: [],
      collectionsTableColumns: [
        {
          name: 'Collection',
          selector: 'path',
          sortable: true,
          grow: 1,
          minWidth: '300px',
        },
        {
          name: 'Actions',
          sortable: false,
          cell: (path: CollectionPath) => {
            return (
              <div className='actions-cell'>
                {/* TODO: Delete path */}
                {/* <Button variant="danger" onClick={() => this.confirmDeleteBook(row.id)}><Trash /></Button> */}
                <Button variant="danger"><Trash /></Button>
              </div>
            )
          },
        },
      ]
    };
    if (localStorage.getItem('firebaseCollectionsPaths')) {
      this.state = {
        ...this.state,
        collectionPaths: JSON.parse(localStorage.getItem('firebaseCollectionsPaths') || '') as CollectionPath[],
      }
    }
  }

  handleAddCollectionPath(e: FormEvent<HTMLFormElement>) {
    // TODO: Try catch errors
    e.preventDefault();
    const newPath = this.pathFromForm(e.currentTarget);
    console.log('newOath')
    if (this.state.collectionPaths.find(cp => cp.path === newPath.path)) {
      throw new Error('Collection path already exists');
    }
    this.setState({
      collectionPaths: [...this.state.collectionPaths, newPath],
    });
    localStorage.setItem('firebaseCollectionsPaths', JSON.stringify(this.state.collectionPaths))

  }

  pathFromForm(f: HTMLFormElement) {
    return {path: this.namedItemFromForm(f, 'formNewCollectionPath')};
  }

  namedItemFromForm(f: HTMLFormElement, namedItem: string) {
    return (f.elements.namedItem(namedItem) as HTMLInputElement).value;
  }
  
  render() {
    return (
      <Container>
        <ReactDataTable<CollectionPath>
          title='Collections'
          columns={this.state.collectionsTableColumns}
          data={this.state.collectionPaths}
        />
        <Form onSubmit={this.handleAddCollectionPath}>
          <Form.Row className="align-items-center">
            <Col xs="auto">
              <Form.Label htmlFor="formNewCollectionPath" srOnly>
                Collection Path
              </Form.Label>
              <Form.Control
                className="mb-2"
                id="formNewCollectionPath"
                placeholder="New Collection Path"
              />
            </Col>
            <Col xs="auto">
              <Button type="submit" className="mb-2">
                Add
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Container>
      
    );
  }
}

export default Collections;