import "./App.css";
import React, { useEffect } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import AppBar from "./components/AppBar";
import SignIn from "./pages/SignIn";
import User from "./pages/profile/User";
import Dashboard from "./pages/admin/Dashboard";
import NotFound from "./pages/exception/NotFound";

import { useSetRecoilState } from "recoil";
import { userSeletor } from "./recoil/userState";

import { auth } from "./utils/auth";
import { validateToken } from "./api/authAPI";

function App() {
  const setUserState = useSetRecoilState(userSeletor);

  useEffect(() => {
    const token = auth.getToken();
    if (token) {
      validateToken(token)
        .then((data) => {
          setUserState({
            userId: data.userId,
            username: data.username,
            token: data.token,
            role: data.role,
          });
        })
        .catch((err) => {
          setUserState({
            userId: null,
            username: null,
            token: null,
            isAdmin: null,
          });
        });
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <AppBar />
          </Route>
          <Route path="/login" exact>
            <AppBar />
            <SignIn />
          </Route>
          <Route path="/admin">
            <Dashboard />
          </Route>
          <Route path="/profile" exact>
            <AppBar />
            <User />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
