import React from "react";
import { Container as ContainerBootstrap, Row, Col } from "reactstrap";
import Container from "./Container";
import Sidebar from "./Sidebar";

const Contacts = () => (
  <ContainerBootstrap fluid>
    <Row>
      <Col sm="2">
        <Sidebar />
      </Col>
      <Col sm="10">
        <Container />
      </Col>
      <Col sm="2" />
    </Row>
  </ContainerBootstrap>
);

export default Contacts;
