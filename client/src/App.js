import React from "react";
import Admin from "./Components/Admin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
  return (
    <div className="md:mx-auto md:py-6 px-0 container">
      <div className="flex flex-col w-full shadow-xl sm:p-4 p-1 bg-white">
        <Router>
          <Switch>
            <Route path="/" exact component={Admin}></Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
