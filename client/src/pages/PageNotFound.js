import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ backgroundColor: "#282c34" }}>Page Not Found :/</h1>
      <h3>
        Try this links: <Link to="/"> Home Page </Link>
      </h3>
    </div>
  );
}

export default PageNotFound;
