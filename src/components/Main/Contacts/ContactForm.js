import React from 'react';
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
  Alert,
  FormFeedback,
} from 'reactstrap';
import axios from 'axios';

// Validation inspired by : https://medium.freecodecamp.org/how-to-use-reacts-controlled-inputs-for-instant-form-field-validation-b1c7b033527e
export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    this.urlContact = process.env.REACT_APP_API_HOST + `/contact/`;

    this.state = {
      name: '',
      email: '',
      message: '',
      touched: {
        name: false,
        email: false,
        message: false,
      },
      nameError: '',
      emailError: '',
      messageError: '',
    };
  }

  componentDidMount() {
    this.validate();
  }

  handleChange(event) {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  }

  // Spread notation is handy not only for that use case, but for creating a new object with most (or all) of the properties of an existing object
  // https://stackoverflow.com/questions/31048953/what-do-these-three-dots-in-react-do
  handleBlur(event) {
    const { name } = event.target;

    this.setState({
      touched: { ...this.state.touched, [name]: true },
    });
  }

  shouldMarkError(nameOfInput) {
    const hasError = this.validate(nameOfInput);
    let shouldShow = this.state.touched[nameOfInput];
    return hasError ? shouldShow : false;
  }

  validate(nameOfInput) {
    switch (nameOfInput) {
      case 'name':
        return this.state.name.length === 0;

        break;
      case 'email':
        return this.state.email.length === 0;

        break;
      case 'message':
        return this.state.message.length === 0;

        break;
      default:
        return (
          this.state.name.length === 0 ||
          this.state.email.length === 0 ||
          this.state.message.length === 0
        );
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    this.sendMessage();

    this.setState({
      name: '',
      email: '',
      message: '',
      touched: {
        name: false,
        email: false,
        message: false,
      },
    });
  }

  sendMessage() {
    const { name, email, message } = this.state;
    axios
      .post(this.urlContact, {
        name: name,
        email: email,
        message: message,
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
    const errorName = this.shouldMarkError('name');
    const errorEmail = this.shouldMarkError('email');
    const errorMessage = this.shouldMarkError('message');

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
                    className={errorName ? 'is-invalid' : ''}
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                  />
                  <FormFeedback>
                    {errorName ? "Your name can't be empty" : ''}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label>Your email:</Label>
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    onBlur={this.handleBlur}
                    className={errorEmail ? 'is-invalid' : ''}
                    onChange={this.handleChange}
                  />
                  <FormFeedback>
                    {errorEmail ? "Your email can't be empty" : ''}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label>Message:</Label>
                  <Input
                    type="textarea"
                    name="message"
                    value={message}
                    onBlur={this.handleBlur}
                    className={errorMessage ? 'is-invalid' : ''}
                    onChange={this.handleChange}
                  />
                  <FormFeedback>
                    {errorMessage ? "Your message can't be empty" : ''}
                  </FormFeedback>
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
