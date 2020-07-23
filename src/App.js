import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Vote } from "./components/Vote";
import { Login } from "./components/Login";

const App = () => {
  return (
    <Router>
      <Route path='/' exact component={Login} />
      <Route path='/vote' component={Vote} />
    </Router>
  );
};

export default App;
