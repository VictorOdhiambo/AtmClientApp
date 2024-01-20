import React, { useContext, useState } from "react";
import AuthContext from "../context/ContextProvider";
import Logo from "../assets/logo.png"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {handleSignIn} = useContext(AuthContext);

  return (
    <div>
      <form action="" className="login-form">
        <img src={Logo} alt="logo" />
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            onChange={e => setUsername(e.target.value)}
            className="form-control form-control-sm"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={e => setPassword(e.target.value)}
            className="form-control form-control-sm"
          />
        </div>
        <button className="btn btn-sm btn-secondary" onClick={e => handleSignIn(e, username, password)}>Sign In</button>
      </form>
    </div>
  );
}

export default Login;
