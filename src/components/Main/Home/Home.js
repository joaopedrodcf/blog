import React from "react";
import { Container, Row, Col } from "reactstrap";

const Home = () => (
  <Container fluid>
    <Row>
      <Col sm="2">This is the sidebar</Col>
      <Col sm="10">
        <h1>This is my blog homepage</h1>
        <p>Needs to be updated....</p>
      </Col>
    </Row>
  </Container>
);

export default Home;
