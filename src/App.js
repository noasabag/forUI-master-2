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
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <GetText />
            </ProtectedRoute>
          }
        />

        <Route path="/signin" element={<SigninScreen />} />

        <Route element={<Navbar />}>
          <Route path="/text" element={<GetText />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wordlist" element={<WordList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
