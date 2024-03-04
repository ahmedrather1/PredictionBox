import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePage from "./pages/HomePage";
import ComingSoonPage from "./pages/ComingSoonPage";
import KnnPage from "./pages/KnnPage";
import SlrPage from "./pages/SlrPage";
import MlrPage from "./pages/MlrPage";
import RidgePage from "./pages/RidgePage";
import LassoPage from "./pages/LassoPage";

function App() {
  return (
    <div className="app-container">
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
