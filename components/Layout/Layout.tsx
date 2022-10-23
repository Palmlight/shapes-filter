import React, { ReactElement } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <section className="global-layout">
      <Navbar />
      <main className="layout-children global-inner-container">{children}</main>
    </section>
  );
};

export default Layout;
