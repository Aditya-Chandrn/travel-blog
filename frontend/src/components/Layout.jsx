import React from 'react';
import { Footer, Navbar } from "pages/path";

const Layout = ({children}) => {
  return (
    <>
      <Navbar/>
        {children}
      <Footer/>
    </>
  )
}

export default Layout