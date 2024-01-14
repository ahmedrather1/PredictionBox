import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomKnnPage from "./pages/CustomKnnPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePage from "./pages/HomePage";
import styled from "styled-components";
import ComingSoonPage from "./pages/ComingSoonPage";

function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/knn" element={<CustomKnnPage />} />
          <Route path="/slr" element={<ComingSoonPage />} />
          <Route path="/mlr" element={<ComingSoonPage />} />
          <Route path="/lasso" element={<ComingSoonPage />} />
          <Route path="/ridge" element={<ComingSoonPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
