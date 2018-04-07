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
  CardFooter,
  Alert
} from "reactstrap";
import axios from "axios";

// Validation inspired by : https://medium.freecodecamp.org/how-to-use-reacts-controlled-inputs-for-instant-form-field-validation-b1c7b033527e
export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    this.urlContact = `http://localhost:8080/contact/`;

    this.state = {
      name: "",
      email: "",
      message: "",
      touched: {
        name: false,
        email: false,
        message: false
      }
    };
  }

  componentDidMount() {
    this.validate();
  }

  handleChange(event) {
    const { value, name } = event.target;

    this.setState({
      [name]: value
    });
  }

  // Spread notation is handy not only for that use case, but for creating a new object with most (or all) of the properties of an existing object
  // https://stackoverflow.com/questions/31048953/what-do-these-three-dots-in-react-do
  handleBlur(event) {
    const { name } = event.target;

    this.setState({
      touched: { ...this.state.touched, [name]: true }
    });
  }

  shouldMarkError(nameOfInput) {
    const hasError = this.validate(nameOfInput);
    const shouldShow = this.state.touched[nameOfInput];
    return hasError ? shouldShow : false;
  }

  validate(nameOfInput) {
    switch (nameOfInput) {
      case "name":
        return this.validateName();

        break;
      case "email":
        return this.validateEmail();

        break;
      case "message":
        return this.validateMessage();

        break;
      default:
        console.log(
          this.validateName(),
          this.validateEmail(),
          this.validateMessage()
        );
        return (
          this.validateName() || this.validateEmail() || this.validateMessage()
        );
    }
  }

  validateName() {
    let { name } = this.state;
    if (name.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  validateEmail() {
    let { email } = this.state;
    if (email.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  validateMessage() {
    let { message } = this.state;
    if (message.length === 0) {
      return true;
    } else {
      return false;
    }
  }
  handleSubmit(event) {
    event.preventDefault();

    this.sendMessage();

    this.setState({
      name: "",
      email: "",
      message: "",
      touched: {
        email: false,
        password: false
      }
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
    let { name, email, message } = this.state;

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
                    value={name}
                    className={this.shouldMarkError("name") ? "is-invalid" : ""}
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Your email:</Label>
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    onBlur={this.handleBlur}
                    className={
                      this.shouldMarkError("email") ? "is-invalid" : ""
                    }
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Message:</Label>
                  <Input
                    type="textarea"
                    name="message"
                    value={message}
                    onBlur={this.handleBlur}
                    className={
                      this.shouldMarkError("message") ? "is-invalid" : ""
                    }
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <Button type="submit" value="Submit" disabled={this.validate()}>
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
