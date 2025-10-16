import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import EditorPage from "./components/EditorPage";
import './App.css';
import Login from "./components/auth/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<EditorPage />} />
                <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App;
