import React from 'react';
import './App.css';
import MainBanner from "./bookshelf/components/MainBanner/MainBanner";
import BooksTable from "./bookshelf/components/BooksTable/BooksTable";
import BulkAdd from "./bookshelf/components/BulkAdd/BulkAdd";


class App extends React.Component {

  render() {
    return (
      <div className="App">
        <MainBanner />
        <BulkAdd />
        <BooksTable />
      </div>
    );
  }
}

export default App;
