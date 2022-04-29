import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import LoginForm from "./components/LoginForm";
import User from "./components/User";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Authentication from "./utils/Authentication";

(async () => {
  const isAuth:
    | void
    | {
        isAuth: boolean;
        user: string;
      }
    | {
        isAuth: boolean;
        user?: undefined;
      }
    | undefined = await Authentication();

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<LoginForm payload={isAuth} />} />
        <Route path="/login" element={<LoginForm payload={isAuth} />} />
        <Route path="/user" element={<User payload={isAuth} />} />
      </Routes>
    </BrowserRouter>
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
})();
