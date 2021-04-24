import React from 'react';
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/esm/Navbar";
import './MainBanner.css';

class MainBanner extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <div className='brand-name'>
            <h5>[F4]</h5>
            <h6>Firebase Firestore Facade Frontend</h6>
          </div>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="books">Home</Nav.Link>
          <Nav.Link href="bulk-add">Bulk Add</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default MainBanner;