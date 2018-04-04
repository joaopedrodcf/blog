import React from "react";
import { Col, Container, Row } from "reactstrap";

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <Row>
          <Col>
            <i className="fab fa-github" />
            <a href="https://github.com/joaopedrodcf">Github page</a>
          </Col>
        </Row>
        <Row>
          <Col>
            <i className="fab fa-linkedin" />
            <a href="https://www.linkedin.com/in/joaoferr93/">Linkedin page</a>
          </Col>
        </Row>
      </footer>
    );
  }
}
