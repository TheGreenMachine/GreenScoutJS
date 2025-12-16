import { Route } from "react-router-dom";
import "./App.css";
import Login from "./components/loginpage/Login";
import Home from "./components/homepage/Home";
// import { nanoid } from "nanoid";

function App () {
    return (
        <Routes>
            <Route path="/" element={<Login></Login>}/>
            <Route path="/home" element={<Home></Home>}/>
        </Routes>
        // <Login></Login>
    )
}

export default App;