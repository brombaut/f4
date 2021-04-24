import React from 'react';
import './App.css';
import MainBanner from "./bookshelf/components/MainBanner/MainBanner";
import BooksTable from "./bookshelf/components/BooksTable/BooksTable";
import BulkAdd from "./bookshelf/components/BulkAdd/BulkAdd";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <MainBanner />
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <BooksTable />
            </Route>
            <Route path="/books">
              <BooksTable />
            </Route>
            <Route path="/bulk-add">
              <BulkAdd />
            </Route>
            <Redirect to="/books" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
