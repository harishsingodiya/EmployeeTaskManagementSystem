import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login(props) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    if (credentials.username && credentials.password) {
      axios
        .post("http://localhost:5000/auth/login", credentials)
        .then((res) => {
          if (res.data.status !== 400) {
            localStorage.setItem("accessToken", res.data.accessToken);
            window.open("/users", "_self");
          } else toast.warn("Invalid User.");
        })
        .catch((err) => {
          console.log(err);
        });
    } else toast.warn("Please provide username and password.");
  };

  return (
    <div className="container">
      <div className="row p-2 d-flex justify-content-center">
        <div className="col-sm-6 text-left">
          <div className="card ">
            <div className="card-body">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter username"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
              </div>
              <div className="card-footer text-center bg-white">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
