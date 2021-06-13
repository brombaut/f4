import { FirebaseConfigurer } from "firebase-firestore-facade";
import React, { FormEvent } from 'react';
import { Link } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import './AddFirebaseConfig.css';
import AlertDismissible from "../AlertDismissible/AlertDismissible";


enum ActionStatus {
  None = 1,
  Success,
  Failure
}
interface MyProps {
};

interface MyState {
  config: FirebaseConfigurer | null;
  saveStatus: ActionStatus;
};

class AddFirebaseConfig extends React.Component<MyProps, MyState> {
  configForm: React.RefObject<HTMLFormElement>;
  constructor(props: MyProps) {
    super(props);
    this.configForm = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideAlerts = this.hideAlerts.bind(this);

    this.state = {
      config: null,
      saveStatus: ActionStatus.None,
    };
    const localStorageFirebaseConfig = localStorage.getItem('firebaseConfig');
    if (localStorageFirebaseConfig) {
      this.state = {
        ...this.state,
        config: JSON.parse(localStorageFirebaseConfig) as FirebaseConfigurer
      }
    }
  }

  hideAlerts() {
    this.setState({
      saveStatus: ActionStatus.None,
    });
  }

  handleSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const newConfig = this.configFromForm();
      localStorage.setItem('firebaseConfig', JSON.stringify(newConfig))
      this.setState({
        saveStatus: ActionStatus.Success,
      });
    } catch {
      this.setState({
        saveStatus: ActionStatus.Failure,
      });
    }

  }

  configFromForm() {
    const f = this.configForm.current;
    if (!f) {
      throw new Error('Form not found');
    }
    console.log(f);
    const result: FirebaseConfigurer = {
      apiKey: this.namedItemFromForm(f, 'formApiKey'),
      authDomain: this.namedItemFromForm(f, 'formAuthDomain'),
      projectId: this.namedItemFromForm(f, 'formProjectId'),
      storageBucket: this.namedItemFromForm(f, 'formStorageBucket'),
      messagingSenderId: this.namedItemFromForm(f, 'formMessagingSenderId'),
      appId: this.namedItemFromForm(f, 'formAppId'),
      measurementId: this.namedItemFromForm(f, 'formMeasurementId'),
      auth: {
        email: this.namedItemFromForm(f, 'formAuthEmail'),
        password: this.namedItemFromForm(f, 'formAuthPassword'),
      }
    }
    return result;
  }

  namedItemFromForm(f: HTMLFormElement, namedItem: string) {
    return (f.elements.namedItem(namedItem) as HTMLInputElement).value;
  }

  render() {
    const lrPad = 2;
    const labelCol = 2;
    const inputCol = 6;
    return (
      <Container
        id='add-firebase-config'
        className='mt-5'>
        <h1>Update Firebase Config</h1>
        <Form
          className='mt-4'
          onSubmit={this.handleSubmit}
          ref={this.configForm}>
          <Form.Group as={Row} controlId="formApiKey">
            <Col sm={lrPad} />
            <Form.Label column sm={labelCol}>API Key</Form.Label>
            <Col sm={inputCol}>
              <Form.Control
                type="text"
                placeholder="Enter API key"
                defaultValue={this.state.config?.apiKey}
              />
            </Col>
            <Col sm={lrPad} />
          </Form.Group>

          <Form.Group as={Row} controlId="formAuthDomain">
            <Col sm={lrPad} />
            <Form.Label column sm={labelCol}>Auth Domain</Form.Label>
            <Col sm={inputCol}>
              <Form.Control
                type="text"
                placeholder="Enter Domain"
                defaultValue={this.state.config?.authDomain}
              />
            </Col>
            <Col sm={lrPad} />
          </Form.Group>

          <Form.Group as={Row} controlId="formProjectId">
          <Col sm={lrPad} />
            <Form.Label column sm={labelCol}>Project ID</Form.Label>
            <Col sm={inputCol}>
              <Form.Control
                type="text"
                placeholder="Enter Project ID"
                defaultValue={this.state.config?.projectId}
              />
            </Col>
            <Col sm={lrPad} />
          </Form.Group>

          <Form.Group as={Row} controlId="formStorageBucket">
            <Col sm={lrPad} />
            <Form.Label column sm={labelCol}>Storage Bucket</Form.Label>
            <Col sm={inputCol}>
              <Form.Control
                type="text"
                placeholder="Enter Storage Bucket"
                defaultValue={this.state.config?.storageBucket}
              />
            </Col>
            <Col sm={lrPad} />
          </Form.Group>

          <Form.Group as={Row} controlId="formMessagingSenderId">
            <Col sm={lrPad} />
            <Form.Label column sm={labelCol}>Messaging Sender ID</Form.Label>
            <Col sm={inputCol}>
              <Form.Control 
                type="text"
                placeholder="Enter Messaging Sender ID"
                defaultValue={this.state.config?.messagingSenderId}
              />
            </Col>
            <Col sm={lrPad} />
          </Form.Group>

          <Form.Group as={Row} controlId="formAppId">
            <Col sm={lrPad} />
            <Form.Label column sm={labelCol}>App ID</Form.Label>
            <Col sm={inputCol}>
              <Form.Control
                type="text"
                placeholder="Enter App ID"
                defaultValue={this.state.config?.appId}
              />
            </Col>
            <Col sm={lrPad} />
          </Form.Group>

          <Form.Group as={Row} controlId="formMeasurementId">
            <Col sm={lrPad} />
            <Form.Label column sm={labelCol}>Measurement ID</Form.Label>
            <Col sm={inputCol}>
              <Form.Control
                type="text"
                placeholder="Enter Measurmeent ID"
                defaultValue={this.state.config?.measurementId}
              />
            </Col>
            <Col sm={lrPad} />
          </Form.Group>

          <Form.Group as={Row} controlId="formAuthEmail">
            <Col sm={lrPad} />
            <Form.Label column sm={labelCol}>Authentication Email</Form.Label>
            <Col sm={inputCol}>
              <Form.Control
                type="text"
                placeholder="Enter Authentication Email"
                defaultValue={this.state.config?.auth?.email}
              />
            </Col>
            <Col sm={lrPad} />
          </Form.Group>

          <Form.Group as={Row} controlId="formAuthPassword">
            <Col sm={lrPad} />
            <Form.Label column sm={labelCol}>Authentication Password</Form.Label>
            <Col sm={inputCol}>
              <Form.Control
                type="text"
                placeholder="Enter Authentication Password"
                defaultValue={this.state.config?.auth?.password}
              />
            </Col>
            <Col sm={lrPad} />
          </Form.Group>

          <Row>
            <Col sm={2} />
            <Col sm={1}>
              <Link to="/">
                <Button variant="outline-secondary">
                  Back
                </Button>
              </Link>
            </Col>
            <Col sm={6} />
            <Col sm={1}>
              <Button variant="primary" type="submit">Save</Button>
            </Col>
            <Col sm={2} />
          </Row>
          <Row className='mt-4'>
            <Col sm={2} />
            <Col sm={8}>
              <AlertDismissible
                show={this.state.saveStatus === ActionStatus.Success}
                type="success"
                header='Config saved to local storage'
                content=''
                dismissCallback={this.hideAlerts}/>
              </Col>
            <Col sm={2} />
          </Row>
          <Row className='mt-4'>
            <Col sm={2} />
            <Col sm={8}>
              <AlertDismissible
                show={this.state.saveStatus === ActionStatus.Failure}
                type="danger"
                header='Error: Could not save config to local storage'
                content=''
                dismissCallback={this.hideAlerts}/>
            </Col>
            <Col sm={2} />
          </Row>
        </Form>
      </Container>
    );
  }
}

export default AddFirebaseConfig;