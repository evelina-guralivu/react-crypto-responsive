import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  Button,
  Alert,
  FormSelect,
  FormTextarea
} from "shards-react";
import axios from "axios";
import config from "../../config";

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      reason: '',
      message: '',
      submited: false,
    };
  }

  submitTicket = () => {
    var data = {
      "name": this.state.name,
      "email": this.state.email,
      "reason": this.state.reason,
      "message": this.state.message,
    };
    axios.post(config.baseUrl + "contact-us", data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        this.setState({
          submited: true,
          email: '',
          name: '',
          reason: '',
          message: ''
        });
      })
      .catch((error) => {
      })
  }

  setEmail = (event) => {
    this.setState({ email: event.target.value });
  }
  setName = (event) => {
    this.setState({ name: event.target.value });
  }
  setReason = (event) => {
    this.setState({ reason: event.target.value });
  }
  setMessage = (event) => {
    this.setState({ message: event.target.value });
  }

  render() {
    return (
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form>
                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="feEmailAddress">Email</label>
                    <FormInput
                      id="feEmailAddress"
                      type="email"
                      placeholder="Email"
                      value={this.state.password}
                      onChange={this.setEmail}
                    />
                  </Col>
                </Row>

                <FormGroup>
                  <label htmlFor="feInputAddress">Name</label>
                  <FormInput id="feInputAddress" placeholder="Name"
                    value={this.state.name}
                    onChange={this.setName}
                  />
                </FormGroup>
                <Row form>
                  <Col md="4" className="form-group">
                    <label htmlFor="feInputState">Reason</label>
                    <FormSelect id="feInputState"
                      value={this.state.reason}
                      onChange={this.setReason}>
                      <option>...</option>
                      <option>Site Bug</option>
                      <option>Membership/Billing</option>
                      <option>Content Related</option>
                      <option>Other</option>
                    </FormSelect>
                  </Col>
                </Row>
                <Row form>
                  <Col md="12" className="form-group">
                    <label htmlFor="feInputCity">Message</label>
                    <FormTextarea id="feDescription" rows="5" placeholder="Message"
                      value={this.state.message}
                      onChange={this.setMessage} />
                  </Col>
                </Row>
                <Button type="button" onClick={this.submitTicket}>Send</Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
        {this.state.submited && <Alert className="mb-0">
          <i className="fa fa-info mx-2"></i> Ticket submited!
      </Alert>}
      </ListGroup>
    )
  }
};

export default ContactForm;
