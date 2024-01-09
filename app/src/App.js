import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import KnnPage from "./pages/KnnPage";
import CustomKnnPage from "./pages/CustomKnnPage";
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
