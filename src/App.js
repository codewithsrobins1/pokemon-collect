import React from 'react';
import { BrowserRouter as Router , Switch, Route } from 'react-router-dom';

//Components
import Landing from './Landing'
import PokeCollector from './PokeCollector';
import Navbar from './Navbar';

//CSS Styles
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/collection" component={PokeCollector} />
        </Switch>
        
      </div>
    </Router>

  )
}
  

export default App;
