import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header() {
  return (
    <>
      <Navbar expand="sm" style={{ backgroundColor: "#f2f2f2" }}>
        <Container>
          <Navbar.Brand href="#home">ModelBox</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="knn">KNN</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr className="header-divider mt-0 pt-0 mb-0 pb-0" />
    </>
  );
}

export default Header;
