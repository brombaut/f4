import React from 'react';
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/esm/Navbar";
import './MainBanner.css';

class MainBanner extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand>
          <div className='brand-name'>
            <h5 className='primary-name'><b>[F4]</b></h5>
            <h6 className='secondary-name'><i>Firebase Firestore Facade Frontend</i></h6>
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