import React, { useEffect, useState } from "react";
import GraphComponent from "./GraphComponent";
import { Navbar, Container, Nav } from "react-bootstrap";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; // Full viewport height
`;

const Content = styled.div`
  flex-grow: 1; // Allows the content to grow and fill the space
`;

// Styled components
const StyledHeader = styled(Navbar)`
  background-color: #d7bde2;
  font-family: Georgia, serif;
  padding: 15px 0;
`;

const MainContent = styled.div`
  padding: 20px;
`;

const HeaderContainer = styled(Container)`
  max-width: 100%; // Allow full width
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: flex-start; // Align items to the start (left)
  align-items: center; // Center the content vertically
  padding: 20px;
`;

const GraphContainer = styled.div`
  flex: 0 0 40%; // The GraphComponent will take up 25% of the container width and will not grow or shrink
  // You can adjust the flex-basis percentage to control the width more precisely
`;

// Header Component
function Header() {
  return (
    <StyledHeader bg="purple" expand="lg">
      <HeaderContainer>
        <Navbar.Brand href="#home">Mess With ML</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </HeaderContainer>
    </StyledHeader>
  );
}

// CustomKnnPage Component
function CustomKnnPage() {
  const [file, setFile] = useState(null);
  const [xrange, setXrange] = useState(null);
  const [ypred, setYpred] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/call-custom-knn/", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        setYpred(data.ypred);
        setXrange(data.xrange);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (file) {
      // Handle file processing or upload here
      console.log("File ready for processing: ", file);
      // TODO: Implement the logic to process or save the file
    }
  }, [file]);

  const handleFileChange = (event) => {
    // This will grab the first file
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const renderContent = () => {
    if (!file) {
      return <input type="file" onChange={handleFileChange} />;
    }

    if (xrange && ypred) {
      return (
        <GraphContainer>
          <GraphComponent xValues={xrange} yValues={ypred} />
        </GraphContainer>
      );
    }

    return <p>Loading data, please wait...</p>;
  };

  return (
    <div>
      <Header />
      <MainContent>
        <h3>K Nearest Neighbors</h3>
        <FlexContainer>{renderContent()}</FlexContainer>
      </MainContent>
    </div>
  );
}

export default CustomKnnPage;
