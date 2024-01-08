import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import KnnPage from "./KnnPage";
import CustomKnnPage from "./CustomKnnPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomKnnPage />} />
      </Routes>
    </Router>
  );
}

export default App;
