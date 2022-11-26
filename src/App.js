import React, { useContext } from "react";
import "./App.css";
import Nav from "./Components/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Pages/Login'
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Movie from "./Pages/Movie";
import { UserState } from './Context';

function App() {
  const { user,setUser } = UserState()
  console.log("1111111111111111111111",user)
  return (
    <>
    <BrowserRouter>
      <div className="App">
        <Nav />
        </div>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={user ? <Home /> : <Login />} />
          <Route exact path="/movie/:id" element={<Movie />} />
         
         </Routes>
      </BrowserRouter>

    </>

  );
}

export default App;
