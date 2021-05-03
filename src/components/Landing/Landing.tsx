import React from 'react';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Collections from "../Collections/Collections";
import './Landing.css';

interface MyProps {
}

interface MyState {
}

class Landing extends React.Component<MyProps, MyState> {

  render() {
    return (
      <main id='landing'>
        <div id='edit-config-wrapper'>
          <Link to="/add-config">
            <Button variant="primary">Add/Edit Firebase Config</Button>
          </Link>
        </div>
        <div>
          <Collections />
        </div>
      </main>
    );
  }
}

export default Landing;