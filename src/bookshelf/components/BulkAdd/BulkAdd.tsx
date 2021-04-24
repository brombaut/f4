import React from "react";
import { Button, Form } from "react-bootstrap";
import "./BulkAdd.css"

interface MyProps {
}

interface MyState {
}

class BulkAdd extends React.Component<MyProps, MyState> {

  
  render() {
    return (
      <div>
        <h1>Bulk Add</h1>
        <Form className="bulk-add-form">
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Goodreads Book JSON</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }

}

export default BulkAdd;