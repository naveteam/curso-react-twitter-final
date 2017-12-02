import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './components/Routes';
import './App.css';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}> 
          <Routes />
        </Router>
      </div>
    );
  }
}

export default App;
