import React from "react";
import { Col, Row } from "reactstrap";

function Footer() {
  const thisYear = () => {
    const year = new Date().getFullYear();
    return year;
  };
  return (
    <div id="main-footer" className="text-center p-2">
      <Row>
        <Col>
          <p className="text-white">
            Copyright &copy; <span>{thisYear()}</span>
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default Footer;
