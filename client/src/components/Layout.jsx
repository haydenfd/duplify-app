import React from 'react'
import { Nav } from './Nav'
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
        <Nav />
        <Outlet />
    </>
  )
}
