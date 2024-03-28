import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePage from "./pages/HomePage";
import KnnPage from "./pages/KnnPage";
import SlrPage from "./pages/SlrPage";
import MlrPage from "./pages/MlrPage";
import RidgePage from "./pages/RidgePage";
import LassoPage from "./pages/LassoPage";
import { ThemeProvider } from '@mui/material/styles';
import { customTheme } from "./CustomMUITheme";
import ReactGA from "react-ga4"

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID)

function App() {
  return (
    <ThemeProvider theme={customTheme}>
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
    </ThemeProvider>

  );
}

export default App;
