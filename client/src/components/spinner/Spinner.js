import React from "react";
import { Row, Spinner } from "reactstrap";

function GrowingSpinner() {
  return (
    <>
      <Row className="d-flex justify-content-center">
        <Spinner
          style={{ width: "2rem", height: "2rem" }}
          type="grow"
          color="primary"
        />
        <Spinner
          style={{ width: "2rem", height: "2rem" }}
          type="grow"
          color="secondary"
        />
        <Spinner
          style={{ width: "2rem", height: "2rem" }}
          type="grow"
          color="success"
        />
        <Spinner
          style={{ width: "2rem", height: "2rem" }}
          type="grow"
          color="danger"
        />
        <Spinner
          style={{ width: "2rem", height: "2rem" }}
          type="grow"
          color="warning"
        />
        <Spinner
          style={{ width: "2rem", height: "2rem" }}
          type="grow"
          color="info"
        />
        <Spinner
          style={{ width: "2rem", height: "2rem" }}
          type="grow"
          color="light"
        />
        <Spinner
          style={{ width: "2rem", height: "2rem" }}
          type="grow"
          color="dark"
        />
      </Row>
    </>
  );
}

export default GrowingSpinner;
