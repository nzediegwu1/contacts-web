import React, { createContext } from "react";
import { useReducer, StateInspector } from "reinspect";
import reducer, { initialState } from "./reducers/rootReducer";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { ContactTable, NavBar, ProfilePage } from "./components";

function Pages() {
  return (
    <Switch>
      <Route path="/contacts/:id" component={ProfilePage} />
      <Route path="/" component={ContactTable} />
    </Switch>
  );
}

export const AppContext = createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState, "appReducer");
  return (
    <AppContext.Provider value={[state, dispatch]}>
      <BrowserRouter>
        <div className="app-body">
          <Route path="/" component={NavBar} />
          <Route path="/" component={Pages} />
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

function AppWrapper() {
  return (
    <StateInspector name="App">
      <App />
    </StateInspector>
  );
}

export default AppWrapper;
