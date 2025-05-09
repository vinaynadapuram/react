import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./MainPage";
import Express from "./express/Express";
import Home from "./Home";
function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          
            <nav style={{ padding: "10px",display: "flex",
              backgroundColor: "#8247F9",
              borderRadius: "10px" }}>
              <Link to="/" className="link">
                Home
              </Link>

              <Link to="/mainpage" className="link">
                Node
              </Link>
              <Link to="/express" className="link">
                Express
              </Link>
            </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/express" element={<Express />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
