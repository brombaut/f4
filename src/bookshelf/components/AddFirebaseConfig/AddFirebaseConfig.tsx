import React from 'react';
import { Button, Col, Form, Row } from "react-bootstrap";

class AddFirebaseConfig extends React.Component {
  render() {
    return (
      <Form>
        <h1>Add Firebase Config</h1>
        <Form.Group as={Row} controlId="formApiKey">
          <Form.Label column sm={2}>API Key</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter API key" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formAuthDomain">
          <Form.Label column sm={2}>Auth Domain</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter Domain" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formDatabaseUrl">
          <Form.Label column sm={2}>Database URL</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter Database URL" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formProjectId">
          <Form.Label column sm={2}>Project ID</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter Project ID" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formStorageBucket">
          <Form.Label column sm={2}>Storage Bucket</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter Storage Bucket" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formMessagingSenderId">
          <Form.Label column sm={2}>Messaging Sender ID</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter Messaging Sender ID" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formAppId">
          <Form.Label column sm={2}>App ID</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter App ID" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formMeasurementId">
          <Form.Label column sm={2}>Measurement ID</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter Measurmeent ID" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formAuthEmail">
          <Form.Label column sm={2}>Authentication Email</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter Authentication Email" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formAuthPassword">
          <Form.Label column sm={2}>Authentication Password</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter Authentication Password" />
          </Col>
        </Form.Group>

        <Form.Group controlId="formBasicCheckbox">
          <Form.Check 
            type="switch"
            id="custom-switch"
            label="Save to local storage"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default AddFirebaseConfig;