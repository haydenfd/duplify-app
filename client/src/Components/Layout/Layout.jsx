import React from "react";
import { Nav } from "../../Components/Nav/Nav";

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <div className="flex-grow">{children}</div>
    </div>
  );
};
