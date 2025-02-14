import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Update from "./pages/Update";
import NotFound from "./pages/NotFound";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
 
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="m-0 auto w-full min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <Nav/>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/add" element={<Add />}/>
          <Route path="/update/:id" element={<Update />}/>
          {/* <Route path="*" element={<NotFound/>} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
