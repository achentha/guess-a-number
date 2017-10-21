import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class About extends Component {

  render() {
    return(
      <div>
        <Link to="/">Home</Link>
        <p>About</p>
      </div>
    );
  }
}

export default About;
