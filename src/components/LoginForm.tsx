import React from "react";
import { useRef } from "react";

import axios from "axios";

import { Navigate } from "react-router-dom";

interface Props {
  payload?: any;
}

interface Form {
  username?: string;
  password?: string;
}

const LoginForm = (props: Props) => {
  const usernameRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);

  const [username, setUsername] = React.useState<Form["username"]>();
  const [password, setPassword] = React.useState<Form["password"]>();
  const [message, setMessage] = React.useState<string>("");

  if (props.payload?.isAuth) {
    return <Navigate to="/user" replace />;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username && password) {
      axios
        .post("http://localhost:5000/login", {
          username: username,
          password: password,
        })
        .then((res) => {
          const data: { [key: string]: boolean } = res.data;
          if (res.status === 200 && res.statusText === "OK") {
            if (data.userExists && data.passWordValid) {
              // Successful login
              document.cookie = "accessToken=" + data.accessToken;
              window.location.reload();
            }
            if (data.userExists && !data.passWordValid) {
              // Failed login
              setMessage("Wrong password!");
            }
            if (!data.userExists) {
              // User does not exist
              setMessage("User does not exist!");
            }
          }
        })
        .catch((error) => {
          // Fail
          console.log(error);
        })
        .finally(() => {
          // Finally
        });
    }
  };

  const handleChange = (e: React.KeyboardEvent) => {
    const usernameVal: Form["username"] = usernameRef.current.value;
    const passwordVal: Form["password"] = passwordRef.current.value;
    setUsername(usernameVal);
    setPassword(passwordVal);
  };

  return (
    <div className="login-form">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label>Username</label>
        <input
          required
          ref={usernameRef}
          onKeyUp={(e) => {
            handleChange(e);
          }}
          type="text"
          name="username"
        />

        <label>Password</label>
        <input
          required
          ref={passwordRef}
          onKeyUp={(e) => {
            handleChange(e);
          }}
          type="password"
          name="password"
        />
        <button type="submit">Login</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
