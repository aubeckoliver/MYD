import React from "react";
import styles from "./style/Navbar.module.css";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

export default function NavBar({ logout }) {
  return (
    <>
      <ul>
        <li>
          <Link to="/login" onClick={logout} className={styles.logout}>
            <LogoutIcon className={styles.icon} fontSize="large" />
          </Link>
        </li>
        <li className={styles.profile}>
          <Link to="/profile" style={{ float: "right", marginRight: "2%" }}>
            Profile
          </Link>
        </li>
        <li>
          <Link to="/" className={styles.myd}>
            MYD
          </Link>
        </li>
        <li>
          <Link to="/events" style={{ float: "right", marginRight: "2%" }}>
            Events
          </Link>
        </li>
      </ul>
    </>
  );
}
