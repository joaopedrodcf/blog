import React from "react";
import { Container, Row, Col } from "reactstrap";

const Contacts = () => (
  <Container fluid>
    <Row>
      <Col sm="2">This is the sidebar</Col>
      <Col sm="10">
        <h1>This is are my contacts</h1>
        <a href="https://github.com/joaopedrodcf">Github page</a>
      </Col>
    </Row>
  </Container>
);

export default Contacts;
