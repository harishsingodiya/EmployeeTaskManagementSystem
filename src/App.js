import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./styles.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Users from "./components/Users";
import Tasks from "./components/Tasks";
import TaskBoard from "./components/TaskBoard";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./components/Logout";

function App(props) {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios
        .post("http://localhost:5000/auth/verify_token", {
          accessToken: accessToken
        })
        .then((res) => {
          if (res.data.token !== 401) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
          setIsLoggingIn(false);
        })
        .catch((err) => {
          setIsLoggingIn(false);
          console.log(err);
        });
    } else {
      setIsLoggingIn(false);
      setIsAuthenticated(false);
    }
  }, [setIsAuthenticated, setIsLoggingIn]);
  return (
    <Provider store={store}>
      <div className="App">
        {isLoggingIn ? (
          <div>LOADING</div>
        ) : (
          <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand" href="/">
                Employee Management
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/users">
                      Users
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/tasks">
                      Tasks
                    </Link>
                  </li>
                </ul>
                {isAuthenticated ? (
                  <Link className="nav-link" to="/logout">
                    Logout {isAuthenticated}
                  </Link>
                ) : (
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                )}
              </div>
            </nav>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <PrivateRoute path="/users" isAuthenticated={isAuthenticated}>
              <Users />
            </PrivateRoute>
            <PrivateRoute path="/tasks" isAuthenticated={isAuthenticated}>
              <Tasks />
            </PrivateRoute>
            <PrivateRoute path="/task-board" isAuthenticated={isAuthenticated}>
              <TaskBoard />
            </PrivateRoute>
          </Router>
        )}
      </div>
    </Provider>
  );
}

export default App;
