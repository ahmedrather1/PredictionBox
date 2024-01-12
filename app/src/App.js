import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomKnnPage from "./pages/CustomKnnPage";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/knn" element={<CustomKnnPage />} />
      </Routes>
    </Router>
  );
}

export default App;
