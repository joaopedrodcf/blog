import React from "react";
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter
} from "reactstrap";
import axios from "axios";

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    this.urlContact = `http://localhost:8080/contact/`;

    this.state = {
      name: "",
      email: "",
      message: ""
    };
  }

  handleChange(event) {
    const { value, name } = event.target;
    console.log(event.target);
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.sendMessage();

    this.setState({
      name: "",
      email: "",
      message: ""
    });
  }

  sendMessage() {
    const { name, email, message } = this.state;
    axios
      .post(this.urlContact, {
        name: name,
        email: email,
        message: message
      })
      .then(res => {
        console.log(res);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <Row className="marging-top-card">
        <Col />
        <Col sm="4" md="4">
          <Card>
            <CardHeader tag="h5">Contact Form</CardHeader>
            <CardBody>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label>Your name:</Label>
                  <Input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Your email:</Label>
                  <Input
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Message:</Label>
                  <Input
                    type="textarea"
                    name="message"
                    value={this.state.message}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <Button type="submit" value="Submit">
                  Submit
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col />
      </Row>
    );
  }
}
