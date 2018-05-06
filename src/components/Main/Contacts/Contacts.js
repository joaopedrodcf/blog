import ContactForm from './ContactForm';

import React from 'react';
import { Col, Container, Row } from 'reactstrap';

const Contacts = () => (
  <Container fluid>
    <Row>
      <Col>
        <ContactForm />
      </Col>
    </Row>
  </Container>
);

export default Contacts;
