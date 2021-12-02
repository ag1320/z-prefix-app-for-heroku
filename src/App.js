import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import RequireAuth from "./components/RequireAuth";
import Public from "./components/Public";
import Create from "./components/Create";
import PostFull from "./components/PostFull.js";
import MyPosts from "./components/MyPosts.js";
import Edit from './components/Edit.js'
import { Routes, Route, NavLink } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

function App() {
  let [isAuthenticated, setIsAuthenticated] = useState(false);
  let [checked, setChecked] = useState(false);
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [isLoginError, setIsLoginError] = useState(false);
  let [isSignupError, setIsSignupError] = useState(false);
  let [isSignupSuccess, setIsSignupSuccess] = useState(false);
  let [data, setData] = useState([]);
  let [userId, setUserId] = useState(100000000000000000000000);
  let [isUsersPost, setIsUsersPost] = useState(false);
  let [zeroEntry, setZeroEntry] = useState(false);

  const handleSwitchChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleUserChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePassChange = (event) => {
    setPassword(event.target.value);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password.length === 0 || username.length === 0) {
      setZeroEntry(true);
      return;
    }
    let endpoint = "";
    if (checked) {
      endpoint = "signup";
    } else {
      endpoint = "login";
    }
    axios
      .post(`http://localhost:3001/${endpoint}`, {
        username,
        password,
      })
      .then(function (response) {
        if (endpoint === "login") {
          setIsAuthenticated(true);
          setUserId(response.data.user_id);
        } else {
          setIsSignupSuccess(true);
        }
      })
      .catch(function (error) {
        if (endpoint === "login") {
          setIsLoginError(true);
        } else {
          setIsSignupError(true);
        }
      });
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <div className="topbar">
        <NavLink to="/" className="App-link">
          <Button>Home</Button>
        </NavLink>
        <NavLink to="/login" className="App-link">
          {isAuthenticated ? (
            <Button onClick={logout} className="App-link">
              Logout
            </Button>
          ) : (
            <Button>Login</Button>
          )}
        </NavLink>
        <NavLink to="/create" className="App-link">
          <Button>Create</Button>
        </NavLink>
        <NavLink to="/myposts" className="App-link">
          <Button>My Posts</Button>
        </NavLink>
      </div>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Public
                data={data}
                setData={setData}
                setIsUsersPost={setIsUsersPost}
              />
            }
          />
          <Route
            path="/:postId"
            element={
              <PostFull
                data={data}
                userId={userId}
                isUsersPost={isUsersPost}
                setIsUsersPost={setIsUsersPost}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                isAuthenticated={isAuthenticated}
                checked={checked}
                username={username}
                password={password}
                handleUserChange={handleUserChange}
                handlePassChange={handlePassChange}
                handleSwitchChange={handleSwitchChange}
                handleSubmit={handleSubmit}
                isLoginError={isLoginError}
                setIsLoginError={setIsLoginError}
                isSignupError={isSignupError}
                setIsSignupError={setIsSignupError}
                isSignupSuccess={isSignupSuccess}
                setIsSignupSuccess={setIsSignupSuccess}
                zeroEntry={zeroEntry}
                setZeroEntry={setZeroEntry}
              />
            }
          />
          <Route
            path="/create"
            element={
              <RequireAuth isAuthenticated={isAuthenticated}>
                <Create userId={userId} />
              </RequireAuth>
            }
          />
          <Route
            path="/myposts"
            element={
              <RequireAuth isAuthenticated={isAuthenticated}>
                <MyPosts userId={userId} data={data} setData={setData} />
              </RequireAuth>
            }
          />
          <Route
            path="/edit/:postId"
            element={
              <RequireAuth isAuthenticated={isAuthenticated}>
                <Edit data = {data} setData = {setData} />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
