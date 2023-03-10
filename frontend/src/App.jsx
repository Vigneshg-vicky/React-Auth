import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import AdminHome from "./pages/admin/Home"
import Login from "./pages/user/Login";
import AdminLogin from "./pages/admin/Login"
import "./app.css"
import Register from "./pages/user/Register";

function App() {
  return (
    <Router>
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/admin/login" element={<AdminLogin/>}/>
          <Route path="/admin" element={<AdminHome/>}/>
        </Routes>
     
    </Router>
  );
}

export default App;
