import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import sandbox from "../../images/sandbox.png";

function Header() {
  return (
    <>
      <Container fluid>
        <Navbar expand="sm" style={{ backgroundColor: "#f2f2f2" }}>
          <Navbar.Brand href="/">
            {" "}
            <img src={sandbox} width={40} height={40} />
          </Navbar.Brand>
          <Navbar.Brand href="/">PredictionBox</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="knn">KNN</Nav.Link>
              <Nav.Link href="slr">SLR</Nav.Link>
              <Nav.Link href="mlr">MLR</Nav.Link>
              <Nav.Link href="ridge">RIDGE</Nav.Link>
              <Nav.Link href="lasso">LASSO</Nav.Link>
            </Nav>
            <Nav className="mr-auto">
              <Nav.Link href="https://github.com/ahmedrather1/messwithml">
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
