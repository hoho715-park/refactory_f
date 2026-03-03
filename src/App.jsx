// src/App.jsx

import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import CodeInsight from "./pages/CodeInsight";
import FAQ from "./pages/FAQ";
import Community from "./pages/Community";
import ContactUs from "./pages/ContactUs";
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
        <Route path="/more/faq" element={<FAQ />} />
        <Route path="/more/community" element={<Community />} />
        <Route path="/more/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
