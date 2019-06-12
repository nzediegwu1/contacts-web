import React, { createContext } from "react";
import { useReducer, StateInspector } from "reinspect";

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
const initialTabState = { profileActive: true, editActive: false };
const initialState = {
  people: [],
  profileTabs: initialTabState
};
const reducer = (state, action) => {
  switch (action.type) {
    case "people":
      return { ...state, people: action.payload };
    case "profile-tab":
      return {
        ...state,
        profileTabs: !state.profileTabs.profileActive
          ? initialTabState
          : state.profileTabs
      };
    case "edit-tab":
      return {
        ...state,
        profileTabs: !state.profileTabs.editActive
          ? { profileActive: false, editActive: true }
          : state.profileTabs
      };
    case "person":
      return { ...state, person: action.payload };
    default:
      return state;
  }
};

export const ContactContext = createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState, "app-reducer");
  return (
    <ContactContext.Provider value={[state, dispatch]}>
      <BrowserRouter>
        <div className="app-body">
          <Route path="/" component={NavBar} />
          <Route path="/" component={Pages} />
        </div>
      </BrowserRouter>
    </ContactContext.Provider>
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
