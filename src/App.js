import React, { Component } from 'react';
import logo from './components/number.gif';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Play from './components/Play';

class App extends Component {
  render() {
    return (
      <div>
        <div className="App-header">
          <img src={logo} className="logo"></img>
          <img src={logo} className="logo"></img>
          <img src={logo} className="logo"></img>
          <h1>Guess The Number</h1>
        </div>
        <Router>
          <div>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/play' component={Play} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
