import "./style/App.css";
import NavBar from "./navBar";
import { AuthContext } from "./helpers/AuthContext";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PageNotFound from "./pages/PageNotFound";
import Events from "./pages/Events";
import Profile from "./pages/Profile";
import Work from "./pages/Work";
import Workout from "./pages/Workout";
import Shopping from "./pages/Shopping";
import Study from "./pages/Study";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_BASE_URL + "/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
          console.log(response.data.error);
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <div className="c">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <BrowserRouter>
          {!authState.status ? (
            <div style={{ textAlign: "center" }}></div>
          ) : (
            <>
              <div
                style={{
                  top: 0,
                  width: "100%",
                  margin: "auto",
                  position: "-webkit-sticky",
                  zIndex: 3,
                }}
              >
                <NavBar logout={logout} />
              </div>
            </>
          )}
          <br />
          <br />

          <Routes>
            <Route path="/" element={<Home user={authState} />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/events" element={<Events />} />
            <Route path="/profile" element={<Profile user={authState} />} />
            <Route path="/work" element={<Work user={authState} />} />
            <Route path="/workout" element={<Workout user={authState} />} />
            <Route path="/shopping" element={<Shopping user={authState} />} />
            <Route path="/study" element={<Study user={authState} />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
