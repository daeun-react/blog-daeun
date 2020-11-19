import React from "react";
import { Col, Row } from "reactstrap";

function Header() {
  return (
    <div id="page-header" className="mb-3">
      <Row>
        <Col sm="auto" md="6" className="text-center m-auto">
          <h1>REACT BLOG</h1>
          <p>Let's Read!</p>
        </Col>
      </Row>
    </div>
  );
}

export default Header;
