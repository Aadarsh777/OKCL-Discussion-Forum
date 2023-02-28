import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { Backdrop } from "@material-ui/core";
import {
  Dashboard,
  ExitToApp,
} from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/userAction";

const UserOption = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const options = [
    { icon: <ExitToApp />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <Dashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/dashboard");
  }

  function logoutUser() {
    dispatch(logout());
    alert.show("Logout Successfully");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className="speedDial"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        icon={
          <img
            className="speedDialIcon"
            src={"/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOption;
