import React from 'react';
import DataTable, { IDataTableColumn } from "react-data-table-component";
import './Table.css';

interface MyProps<T> {
  title: string;
  columns: IDataTableColumn[];
  data: T[];
}

interface MyState {
}

class ReactDataTable<T> extends React.Component<MyProps<T>, MyState> {
  
  constructor(props: MyProps<T>) {
    super(props)
    this.state = {
    };
  }

 render() {
  return (
    <DataTable
      title={this.props.title}
      columns={this.props.columns}
      data={this.props.data}
      striped={true}
      dense={false}
    />
  )
 }
}

export default ReactDataTable;