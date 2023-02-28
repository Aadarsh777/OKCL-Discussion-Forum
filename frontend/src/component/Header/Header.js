import React from "react";
import logo from "../../images/logo1.jpeg";
import "./Header.css";
import { AccountCircle } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserOption from "./UserOption";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <div className="header">
      <div className="header-logo">
        <img className="logo" src={logo} alt="website-logo" />
      </div>
      <div className="header-items">
        <Link className="header-link" to="/">
          <span className="header-span">Home</span>
        </Link>
        <Link className="header-link" to="/topics">
          <span className="header-span">Topics</span>
        </Link>
        <Link className="header-link" to="/Contact">
          <span className="header-span">Contact</span>
        </Link>
        {isAuthenticated ? (
          <UserOption user={user} />
        ) : (
          <Link to="/register">
            <AccountCircle className="me" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
