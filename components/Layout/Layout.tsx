import React, { ReactElement } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <section className="global-layout">
      <Navbar />
      {children}
    </section>
  );
};

export default Layout;
