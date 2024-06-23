import React from "react";
import { Home, Landing, NotFound, Guide } from "./Pages";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import "./App.css";

import { Nav } from "./Components";


const MainLayout = () => {
  return (
    <div className="main-layout">
      <Nav />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/guide" element={<Guide />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
