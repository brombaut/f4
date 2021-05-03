import React from 'react';
import './App.css';
import MainBanner from "./components/MainBanner/MainBanner";
import Landing from "./components/Landing/Landing";
import AddFirebaseConfig from "./components/AddFirebaseConfig/AddFirebaseConfig";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <MainBanner />
        <div className='main-content'>
        <Router>
          <Switch>
            <Route path="/add-config">
              <AddFirebaseConfig />
            </Route>
            <Route path="/">
              <Landing />
            </Route>
          </Switch>
        </Router>
        </div>
      </div>
    );
  }
}

export default App;
