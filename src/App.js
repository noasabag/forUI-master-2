import logo from "./logo.svg";
import "./App.css";
import React from "react";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import WordList from "./components/WordList";
import GetText from "./components/GetText";
import SigninScreen from "./components/SigninScreen";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  function clearStorage() {
    let session = sessionStorage.getItem("register");
    console.log(session);
    if (session == null) {
      localStorage.removeItem("token");
    }
    sessionStorage.setItem("register", 1);
  }
  window.addEventListener("load", clearStorage);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SigninScreen />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<Navbar />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <GetText />
              </ProtectedRoute>
            }
          />
          <Route
            path="/text"
            element={
              <ProtectedRoute>
                <GetText />{" "}
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wordlist"
            element={
              <ProtectedRoute>
                <WordList />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
