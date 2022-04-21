import React from "react";
import "./Navbar.css";
import LogoutHooks from "../button/Logout";

const Navbar = () => {
  return (
    <div className="Nav">
      <div className="NavMenu">
        <a
          className="NavLink"
          id="Navlink-home"
          href="https://itrack.vercel.app/Home"
        >
          HOME
        </a>
        <a
          className="NavLink"
          id="Navlink-add"
          href="https://itrack.vercel.app/add-activity"
        >
          ADD ACTIVITY
        </a>
        <a
          className="NavLink"
          id="Navlink-list"
          href="https://itrack.vercel.app/activity-list"
        >
          ACTIVITIES LIST
        </a>
        <a className="NavLink" id="Navlink-blog" href="#">
          BLOG
        </a>
        <a className="NavLink" id="Navlink-event" href="#">
          LIVE EVENTS
        </a>
        <a
          className="NavLink"
          id="Navlink-signout"
          href="https://itrack.vercel.app/"
        >
          <LogoutHooks />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
