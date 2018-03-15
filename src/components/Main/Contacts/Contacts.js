import React from "react";
import { Container, Row, Col } from "reactstrap";

const Contacts = () => (
  <Container fluid>
    <Row>
      <Col sm="2">This is the sidebar</Col>
      <Col sm="10">
        <h1>This is are my contacts</h1>
        <Row>
          <i class="fab fa-github" />
          <a href="https://github.com/joaopedrodcf">Github page</a>
        </Row>

        <Row>
          <i class="fab fa-linkedin" />
          <a href="https://www.linkedin.com/in/joaoferr93/">Linkedin page</a>
        </Row>
      </Col>
    </Row>
  </Container>
);

export default Contacts;
