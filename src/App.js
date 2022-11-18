import React from "react";
import "./App.css";
import Nav from "./Components/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Pages/Login'
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Movie from "./Pages/Movie";

function App() {
  return (
    <>
      <div className="App">
        <Nav />
        </div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/movie/:id" element={<Movie />} />
         
         </Routes>
      </BrowserRouter>

    </>

  );
}

export default App;
