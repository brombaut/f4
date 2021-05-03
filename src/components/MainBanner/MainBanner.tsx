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
            <b>F</b>irebase <b>F</b>irestore <b>F</b>acade <b>F</b>rontend
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