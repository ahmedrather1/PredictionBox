import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomKnnPage from "./pages/CustomKnnPage";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import styled from "styled-components";

const StyledApp = styled.div`
  background-color: #f2f2f2;
`;

function App() {
  return (
    <StyledApp>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/knn" element={<CustomKnnPage />} />
        </Routes>
      </Router>
    </StyledApp>
  );
}

export default App;
