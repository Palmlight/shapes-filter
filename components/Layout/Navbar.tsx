import { useRouter } from "next/router";
import React from "react";
import { removeTokenFromStorage } from "../../utils/token";

const Navbar = () => {
  const router = useRouter();

  const logout = () => {
    removeTokenFromStorage();
    router.push("/login");
  };
  return (
    <nav className="navbar">
      <div className="global-inner-container nav-inner">
        <h2>Shapes</h2>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
