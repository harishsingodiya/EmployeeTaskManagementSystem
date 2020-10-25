import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Logout() {
  let history = useHistory();
  useEffect(() => {
    localStorage.removeItem("accessToken");
    window.open("/login", "_self");
  }, [history]);

  return (
    <div>
      <h4>Loging out</h4>
    </div>
  );
}

export default Logout;
