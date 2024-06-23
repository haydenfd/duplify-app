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

// const Landing = () => {
//   return <div>Landing Page</div>;
// };

// export default Landing;

// // Home.js
// const Home = () => {
//   return <div>Home Page</div>;
// };

// // Guide.js
// const Guide = () => {
//   return <div>Guide Page</div>;
// };

// // NotFound.js
// const NotFound = () => {
//   return <div>Page Not Found</div>;
// };

// const Nav = () => {
//   return (
//     <nav>
//       <Link to="/home">Home</Link>
//       <Link to="/guide">Guide</Link>
//     </nav>
//   );
// };

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
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Landing />} />
    //       <Route path="/home" element={<Layout><Home /></Layout>} />
    //       <Route path="/guide" element={<Layout><Guide /></Layout>} />
    //     <Route path="/*" element={<NotFound />} />
    //   </Routes>
    // </Router>
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
