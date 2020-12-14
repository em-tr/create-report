import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import CreateReport from "./components/CreateReport"
function App() {
  return (
    <BrowserRouter basename={"/BPIM_CSS_TEST"}>
<Switch>
  <Route exact={true} path="/createReport" component={CreateReport} />
</Switch>
    </BrowserRouter>
  );
}

export default App;
