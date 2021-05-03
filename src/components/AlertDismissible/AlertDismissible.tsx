import React from 'react';
import { Alert, Button } from "react-bootstrap";

interface MyProps {
  show: boolean;
  type: string;
  header: string;
  content: string;
  dismissCallback: () => void;
}

interface MyState {
  show: boolean;
  type: string;
  header: string;
  content: string;
}

class AlertDismissible extends React.Component<MyProps, MyState> {

  constructor(props: MyProps) {
    super(props);
    this.state = {
      show: props.show,
      type: props.type,
      header: props.header,
      content: props.content,
    }
  }

  static getDerivedStateFromProps(nextProps: MyProps) {
    return {
      show: nextProps.show,
      type: nextProps.type,
      header: nextProps.header,
      content: nextProps.content,
    }
  }

  close() {
    this.setState(() => ({
      show: false
    }));
  }

  render() {
    return (
      <Alert show={this.state.show} variant={this.state.type}>
        <Alert.Heading>{this.state.header}</Alert.Heading>
        <p dangerouslySetInnerHTML={{__html: this.state.content}}>
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button variant={`outline-${this.state.type}`} onClick={() => this.props.dismissCallback()}>
            Dismiss
          </Button>
        </div>
      </Alert>
    );
  }
}

export default AlertDismissible;