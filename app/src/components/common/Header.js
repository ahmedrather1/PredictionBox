import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import sandbox from "../../images/sandbox.png";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
function Header() {

  const location = useLocation();

  const getNavLinkClass = (path) => {
    return location.pathname === path ? {color: "#a955c2", textDecoration: "underline"} : {};
};

  return (
    <>
      <Container fluid>
        <Navbar expand="sm" className="custom-navbar" variant="dark">
          <Navbar.Brand href="/">
            {" "}
            <img src={sandbox} width={40} height={40} />
          </Navbar.Brand>
          <Navbar.Brand href="/" className="gradienttitle">PredictionBox</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" style={{color: "#fff"}}>
            <Nav className="me-auto">
            <Nav.Link href="knn" style={getNavLinkClass("/knn")}>KNN</Nav.Link>
            <Nav.Link href="slr" style={getNavLinkClass("/slr")}>SLR</Nav.Link>
              <Nav.Link href="mlr" style={getNavLinkClass("/mlr")}>MLR</Nav.Link>
              <Nav.Link href="ridge" style={getNavLinkClass("/ridge")}>RIDGE</Nav.Link>
              <Nav.Link href="lasso" style={getNavLinkClass("/lasso")}>LASSO</Nav.Link>
            </Nav>
            <Nav className="mr-auto">
              <Nav.Link href="https://github.com/ahmedrather1/messwithml" target="_blank">
                Github
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
      <hr className="header-divider mt-0 pt-0 mb-0 pb-0" />
    </>
  );
}

export default Header;
