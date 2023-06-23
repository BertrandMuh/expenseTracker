import React from "react";
import { logout } from "../../usefull-functions/functions";

const Nav = () => {
  return (
    <nav>
      <span onClick={logout}>logout</span>
    </nav>
  );
};

export default Nav;
