import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './About.css';

class About extends Component {

  render() {
    return(
      <div>
        <Link to="/" className="about-go-home">Home</Link>
        <p className="about">Shout out to Michelle & Esther who have been digging me out of
           the REACT confusion that they put me in to begin with!</p>
        <p className="about">Joking aside, you have done a great job teaching us.</p>
        <p className="about last">!!! Thanks !!!</p>
      </div>
    );
  }
}

export default About;
