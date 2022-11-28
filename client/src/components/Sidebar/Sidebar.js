import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import CollectionsIcon from "@mui/icons-material/Collections";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import CachedIcon from '@mui/icons-material/Cached';
import BarChartIcon from "@mui/icons-material/BarChart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import "./style.css";

const Sidebar = ({ children }) => {
  const [open, setOpen] = useState(false);
  const toggleSidebar = () => {
    setOpen(!open);
  };

  const menuItem = [
    {
      path: "/manager",
      name: "manager-app",
      icon: <ManageAccountsIcon />,
    },
    {
      path: "/statistics",
      name: "Statistics",
      icon: <BarChartIcon />,
    },
  ];

  return (
    <div className="container">
      <div className={open ? "sidebar" : "sidebar close"}>
        <div className="top_section">
          <h1 className="header" style={{display: open ? "block" : "none"}}> Pages </h1>
          <div className="menu__icon" onClick={toggleSidebar}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </div>
        </div>
        {menuItem.map((item, index) => (
          <li key={item.name}>
            <NavLink to={item.path} key={index} className="link__item">
              <span className="icon">{item.icon}</span>
              <span
                className="link__text"
                style={{ display: open ? "block" : "none" }}
              >
                {item.name}
              </span>
            </NavLink>
          </li>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
