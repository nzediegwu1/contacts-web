import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { ContactTable, NavBar, ProfilePage } from "./components";

function Pages() {
  return (
    <Switch>
      <Route path="/people/:id" component={ProfilePage} />
      <Route path="/" component={ContactTable} />
    </Switch>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-body">
        <Route path="/" component={NavBar} />
        <Route path="/" component={Pages} />
      </div>
    </BrowserRouter>
  );
}

export default App;
