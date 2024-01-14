import React from "react";
import { Container } from "react-bootstrap";
import Header from "../components/common/Header";

const ComingSoonPage = () => {
  return (
    <>
      <Header />
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1>Coming Soon!</h1>
      </Container>
    </>
  );
};

export default ComingSoonPage;
