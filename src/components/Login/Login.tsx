import React from "react";
import { useNavigate } from "react-router-dom";

import "./Login.scss";

type LoginProps = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

const Login: React.FC<LoginProps> = ({ token, setToken }) => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [recoveryCode, setRecoveryCode] = React.useState<string>("");

  const [forgotPassword, setForgotPassword] = React.useState<boolean>(false);
  const [isRecovering, setIsRecovering] = React.useState<boolean>(false);
  const [disBnt, setDisBnt] = React.useState<boolean>(false);

  const [error, setError] = React.useState<string>("");
  const navigate = useNavigate();

  const loginHandler = () => {
    fetch(`https://api.fern.fun/fern/account/get/session/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          localStorage.setItem("session", data.session);
          localStorage.setItem("username", username);
          setToken(data.session);
          navigate("/");
        } else {
          setError(data.message);
        }
      });
  };

  const sendEmailHandler = () => {
    setDisBnt(true);
    fetch(
      `https://api.fern.fun/fern/account/get/recovery/code/${email}/${username}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setIsRecovering(true);
          setError("");
          setPassword("");
        } else {
          setError("Wrong email or username");
          setDisBnt(false);
        }
      });
  };

  const changePasswordHandler = () => {
    fetch(`https://api.fern.fun/fern/account/change/password/${username}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recovery_code: recoveryCode,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "failure") {
          setError(data.reason);
        } else {
          setForgotPassword(false);
          setError("");
        }
      });
  };

  return (
    <div className="loginPanel">
      <div></div>
      <div className="loginPanelElement">
        {!forgotPassword ? (
          <>
            <div className="loginPanelForm">
              <label>Username</label>
              <input
                name="username"
                type={"text"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="loginPanelForm">
              <label>Password</label>
              <input
                name="password"
                type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="loginPanelForm">
              <span id="error">{error}</span>
              <button onClick={loginHandler}>Login</button>
              <a id="login">
                Not on Tools yet?{" "}
                <a href="https://pi.fern.fun/signup" target="_blank">
                  Sign up
                </a>
              </a>
              <a
                id="login"
                onClick={(e) => (setForgotPassword(true), setError(""))}
              >
                <a>Forgot Password?</a>
              </a>
            </div>
          </>
        ) : !isRecovering ? (
          <>
            <div className="loginPanelForm">
              <label>Username</label>
              <input
                name="username"
                type={"text"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="loginPanelForm">
              <label>Email</label>
              <input
                name="email"
                type={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="loginPanelForm">
              <span id="error">{error}</span>
              {disBnt ? (
                <button onClick={sendEmailHandler} disabled>
                  Send Email
                </button>
              ) : (
                <button onClick={sendEmailHandler}>Send Email</button>
              )}
              <a id="login" onClick={(e) => setForgotPassword(false)}>
                <a>Login</a>
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="loginPanelForm">
              <label>Username</label>
              <input
                name="username"
                type={"text"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="loginPanelForm">
              <label>Recovery code</label>
              <input
                name="recovery_code"
                type={"text"}
                value={recoveryCode}
                onChange={(e) => setRecoveryCode(e.target.value)}
                required
              />
            </div>
            <div className="loginPanelForm">
              <label>New password</label>
              <input
                name="passowrd"
                type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="loginPanelForm">
              <span id="error">{error}</span>
              <button onClick={changePasswordHandler}>Change passowrd</button>
              <a id="login" onClick={(e) => setForgotPassword(false)}>
                <a>Login</a>
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
