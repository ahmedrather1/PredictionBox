import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import KnnPage from "./KnnPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<KnnPage />} />
      </Routes>
    </Router>
  );
}

export default App;
