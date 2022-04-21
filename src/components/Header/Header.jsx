import React from "react";

import "./Header.css";

const Header = ({ imgSrc = "/image/itracklogo.png" }) => {
  return (
    <div className="head">
      <img className="art" src={imgSrc} />
      <text className="title">iTRACK</text>
    </div>
  );
};

export default Header;
