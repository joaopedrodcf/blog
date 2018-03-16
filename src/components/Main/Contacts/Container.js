import React from "react";
import { Row } from "reactstrap";

const Container = () => (
  <div>
    <h1>This is are my contacts</h1>
    <Row>
      <i className="fab fa-github" />
      <a href="https://github.com/joaopedrodcf">Github page</a>
    </Row>
    <Row>
      <i className="fab fa-linkedin" />
      <a href="https://www.linkedin.com/in/joaoferr93/">Linkedin page</a>
    </Row>
  </div>
);

export default Container;
