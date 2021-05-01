import React from 'react';
import './App.css';
import MainBanner from "./bookshelf/components/MainBanner/MainBanner";
import Landing from "./bookshelf/components/Landing/Landing";

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <MainBanner />
        <div className='main-content'>
          <Landing />
        </div>
      </div>
    );
  }
}

export default App;
