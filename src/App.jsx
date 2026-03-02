// src/App.jsx

import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import CodeInsight from "./pages/CodeInsight";
import SubMenu1 from "./pages/SubMenu1";
import SubMenu2 from "./pages/SubMenu2";
import SubMenu3 from "./pages/SubMenu3";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "./App.css";

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/code-insight" element={<CodeInsight />} />
        <Route path="/more/sub1" element={<SubMenu1 />} />
        <Route path="/more/sub2" element={<SubMenu2 />} />
        <Route path="/more/sub3" element={<SubMenu3 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
