import React from "react";
import {
  Col,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";

// Solution :  https://stackoverflow.com/questions/46964332/how-to-dynamically-render-jsx-component-x-times
export default class Paginations extends React.Component {
  render() {
    const { pages, getPostsPagination, numElements } = this.props;
    return (
      <Row>
        <Col sm="12">
          <Pagination>
            {Array.from({ length: pages }, (_, k) => (
              <PaginationItem key={k}>
                <PaginationLink
                  onClick={() => getPostsPagination(k, numElements)}
                >
                  {k}
                </PaginationLink>
              </PaginationItem>
            ))}
          </Pagination>
        </Col>
      </Row>
    );
  }
}
