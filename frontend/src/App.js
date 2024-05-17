import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ExperimentList from './components/ExperimentList';
import ExperimentDetail from './components/ExperimentDetail';
import CreateExperiment from './components/CreateExperiment';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={ExperimentList} />
          <Route path="/experiment/:id" component={ExperimentDetail} />
          <Route path="/create" component={CreateExperiment} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
