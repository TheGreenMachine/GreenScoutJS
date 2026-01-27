import "./App.css";
import Login from "./components/loginpage/Login";
import Home from "./components/homepage/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Matchform from "./components/matchform/Matchform";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/GreenScoutJS" element={<Login />} />
        <Route path="/GreenScoutJS/home" element={<Home />} />
        <Route path="/GreenScoutJS/match" element={<Matchform />} />
      </Routes>
    </Router>
  );
}

export default App;
