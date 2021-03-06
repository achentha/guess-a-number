import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Play.css'

class Play extends Component {

  constructor() {
    super();
    this.state = {
      attempts: [],
      success: false,
      question: [],
      "dgt1": 0,
      "dgt2": 0,
      "dgt3": 0,
      playMessage: [
        "My kid can do it in 5 attempts. Can you beat him?",
        "Make your mama proud",
        "Can you make it in 6 attempts?",
        "You for a president, if you win.",
        "Don't em-bar-ass yourself.",
        "The cat says you won't get it",
      ],
      playMessageIdx: 0,
    }
  }

  componentWillMount(){
    this.restartGame();
  }

  restartGame(e) {
    let random3UniqueDgts = this.gen3UniqueDgts();
    let playMessageIdx = random3UniqueDgts[0] % this.state.playMessage.length;

    this.setState({
      attempts: [],
      success: false,
      question: random3UniqueDgts,
      "dgt1": 0,
      "dgt2": 0,
      "dgt3": 0,
      playMessageIdx: playMessageIdx,
    })
    console.log(`question: ${this.state.question}`);
  }

  gen3UniqueDgts() {
    let dgt1 = Math.round(Math.random()*10)%10;

    let dgt2 = Math.round(Math.random()*10)%10;
    if (dgt2 === dgt1)
      dgt2 = (dgt1 + 1)%10;

    let dgt3 = Math.round(Math.random()*10)%10;
    while (dgt3 === dgt1 || dgt3 === dgt2)
      dgt3 = Math.round(Math.random()*10)%10;

    return [dgt1, dgt2, dgt3];
  }

  onInputChange(e, dgt) {
    this.setState({
      [dgt]: e.target.value,
    })
  }

  guessNumber(e) {
    if (this.state.success) return;
    let guess = [ this.state["dgt1"], this.state["dgt2"], this.state["dgt3"]];
    let question = this.state.question;
    let rightCol = 0;
    let wrongCol = 0;

    if (guess[0] == question[0])
      rightCol++;
    else if ((guess[0] == question[1]) || (guess[0] == question[2]))
      wrongCol++;

    if (guess[1] == question[1])
      rightCol++;
    else if ((guess[1] == question[0]) || (guess[1] == question[2]))
      wrongCol++;

    if (guess[2] == question[2])
      rightCol++;
    else if ((guess[2] == question[0]) || (guess[2] == question[1]))
        wrongCol++;

    let attempt = {
      guess: guess,
      rightCol: rightCol,
      wrongCol: wrongCol,
    }
    console.log(`guess = ${guess}, rightCol = ${rightCol}, wrongCol = ${wrongCol}`);
    console.log(`attempt.guess = ${attempt.guess}, attempt.rightCol = ${attempt.rightCol}, attempt.wrongCol = ${attempt.wrongCol}`)

    this.setState({
      attempts: this.state.attempts.concat(attempt),
    }, function() {
      this.state.attempts.forEach(function(attempt) {
        console.log(`${attempt.guess}, ${attempt.rightCol}, ${attempt.wrongCol}`);
      });
    });

    this.refs.dgt1field.value = this.refs.dgt2field.value = this.refs.dgt3field.value = "";

    let success = (rightCol === 3) ? true : false;
    console.log(success ? "You did it" : "Not yet");

    this.setState({success: success,});
  }

  debug() {
    console.log(`question is ${this.state.question}`);
    console.log(`try is ${this.state["dgt1"]}, ${this.state["dgt2"]}, ${this.state["dgt3"]}`);
  }

  render() {
    return(
      <div>
        <button className="again" onClick={e => this.restartGame(e)}>Again</button>
        <Link to="/" className="play-go-home">Home</Link>

        {this.state.success === false ?
          (<p className="play-greeting">{this.state.playMessage[this.state.playMessageIdx]}</p>)
          : (<p className="play-greeting"> . </p>)}

        <input className="digit" onChange={e => this.onInputChange(e,"dgt1")} type="number" name="digit1" min="0" max="9" ref="dgt1field"/>
        <input className="digit" onChange={e => this.onInputChange(e,"dgt2")} type="number" name="digit2" min="0" max="9" ref="dgt2field"/>
        <input className="digit" onChange={e => this.onInputChange(e,"dgt3")} type="number" name="digit3" min="0" max="9" ref="dgt3field"/>
        <button className="go" onClick={e => this.guessNumber(e)}>Go</button>
        <span className="attempt-count">Attempt count: {this.state.attempts.length}</span>
        <button className="debug" onClick={e => this.debug(e)} className="debug">Debug</button>
        {this.state.attempts.map(attempt => {
          return (
            <div>
              <p><span className="attempt">{attempt.guess.join(" ")}</span>
                 <span className="right-col"> Right Column: {attempt.rightCol}</span>
                 <span className="wrong-col"> Wrong Column: {attempt.wrongCol}</span>
              </p>
            </div>
          )
        })}


        <div>
          {(this.state.success === true)? (<p className="win">You did it</p>) : ""}
        </div>
      </div>
    );
  }
}

export default Play;
