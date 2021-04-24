import React from 'react';
import { Button, Table } from "react-bootstrap";
import './F4Table.css';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

interface MyProps {
  rows: string[][];
  headers: string[];
  deleteCallback: (id: string) => void;
}

interface MyState {
}

class F4Table extends React.Component<MyProps, MyState> {
  
  constructor(props: MyProps) {
    super(props)
    this.state = {
    };
  }

  renderTableHeader() {
    const headerEls = this.props.headers.map((header: string, index: number) => {
      return (
        <th key={index}>{header.toUpperCase()}</th>
      )
    });
    headerEls.push((<th key={this.props.headers.length}></th>));
    return headerEls;
  }

  renderTableData() {
    return this.props.rows.map((row: string[]) => {
        const cells = [];
        for (var i = 0; i < row.length; i++) {
          cells.push(<td key={i}>{row[i]}</td>);
        }
        cells.push(this.renderEditCell(row[0]))
        return (
          <tr key={row[0]}>{cells}</tr>
        )
    })
  }

  renderEditCell(entityId: string) {
    return (
      <td key={this.props.headers.length} className='actions-cell'>
        <Button variant="warning"><PencilSquare /></Button>
        <Button variant="danger" onClick={() => this.props.deleteCallback(entityId)}><Trash /></Button>
      </td>
    )
  }

 render() {
  return (
    <Table striped bordered responsive size="sm" id='table'>
      <thead>
        <tr>{this.renderTableHeader()}</tr>
      </thead>
      <tbody>
        {this.renderTableData()}
      </tbody>
    </Table>
  )
 }
}

export default F4Table;