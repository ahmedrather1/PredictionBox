import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePage from "./pages/HomePage";
import KnnPage from "./pages/KnnPage";
import SlrPage from "./pages/SlrPage";
import MlrPage from "./pages/MlrPage";
import RidgePage from "./pages/RidgePage";
import LassoPage from "./pages/LassoPage";

import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(
    to bottom,
    #121212,
    #222222,
    #272727,
    #2e2e2e
  );
`;

function App() {
  return (
    <div className="plain-bg">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/knn" element={<KnnPage />} />
          <Route path="/slr" element={<SlrPage />} />
          <Route path="/mlr" element={<MlrPage />} />
          <Route path="/lasso" element={<LassoPage />} />
          <Route path="/ridge" element={<RidgePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
