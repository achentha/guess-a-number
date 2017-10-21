import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Home.css';

class Home extends Component {

  render() {
    return(
      <div>
        <Link to='/about' className="home-about">About</Link>
        <h4 className="home-h4">Shall We Play A Game?</h4>
        <div className="home-begin">
          <Link to='/play' className="begin">Begin</Link>
        </div>

      </div>
    );
  }
}

export default Home;
