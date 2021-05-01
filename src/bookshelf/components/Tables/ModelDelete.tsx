import React from 'react';
import { Button, Modal } from "react-bootstrap";

interface MyProps {
  show: boolean;
  entityId: string;
  deleteMessage: string;
  cancelCallback: (entityId: string) => void;
  confirmCallback: (entityId: string) => void;
}

interface MyState {
}

class ModelDelete extends React.Component<MyProps, MyState> {
  
  constructor(props: MyProps) {
    super(props)
    this.state = {
    };
  }

 render() {
  return (
    <Modal show={this.props.show} onHide={() => this.props.cancelCallback(this.props.entityId)}>
      <Modal.Header closeButton>
        <Modal.Title>Confrim Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete {this.props.deleteMessage}?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => this.props.cancelCallback(this.props.entityId)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => this.props.confirmCallback(this.props.entityId)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
 }
}

export default ModelDelete;