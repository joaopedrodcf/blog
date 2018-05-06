import React from 'react';
import {
  Badge,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  Col,
} from 'reactstrap';
import DeleteButton from './DeleteButton';
import { Link } from 'react-router-dom';

export default class PostRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    const {
      id,
      content,
      description,
      title,
      image,
      type: { name },
    } = this.props.post;
    const { deletePost } = this.props;
    return (
      <tr>
        <td>{title}</td>
        <td>{description}</td>
        <td>
          <Badge color="primary">{name}</Badge>
        </td>
        <td>
          <Button color="primary" onClick={this.toggle}>
            Show more
          </Button>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
            <ModalBody>
              <Container fluid>
                <Row>
                  <Col>
                    <img src={image} className="img-fluid" />
                  </Col>
                </Row>
                <Row>
                  <Col>{content}</Col>
                </Row>
              </Container>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </td>
        <td>
          <DeleteButton id={id} deletePost={deletePost} />
        </td>
      </tr>
    );
  }
}
