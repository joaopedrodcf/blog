import Container from "./Container";
import Sidebar from "./Sidebar";

import React from "react";
import { Col, Container as ContainerBootstrap, Row } from "reactstrap";

const Contacts = () => (
  <ContainerBootstrap fluid className="flex-fill">
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
