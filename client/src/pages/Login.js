import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import styles from "../style/Login.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios
      .post(process.env.REACT_APP_BACKEND_BASE_URL + "/auth/login", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
          navigate("/");
        }
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Welcome!</h1>
        <div className={styles.data}>
          <label>Username: </label>
          <input
            className={styles.input}
            type="text"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <br />
          <br />
          <label>Password: </label>
          <input
            className={styles.input}
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <br />
          <br />
          <button onClick={login} className={styles.loginBtn}>
            Login
          </button>
          <br />
          <br />
          <Link to="/registration" className={styles.link}>
            Registration
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
