import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
  <Game />
      
      </div>
    );
  }
}

export default App;


// Write JavaScript here and press Ctrl+Enter to execute
var possibleCombinationSum = function (arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount; i++) {
    var combinationSum = 0;
    for (var j = 0; j < listSize; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

const Stars = (props) => {
  // const numberOfStars = 1+ Math.floor(Math.random()* 9);
  // let stars= [];

  // for(let i=0; i<numberOfStars; i++){
  // stars.push(<i key={i} className="fa fa-star"></i>);
  // }
  return (
    <div className="col-5">
      {_.range(props.numberOfStars).map((i) =>
        <i key={i} className="fa fa-star"></i>
      )}

    </div>
  );
}

const Button = (props) => {
  let button;
  switch (props.answerIsCorrect) {
    case true:
      button = <button className="btn btn-success" onClick={props.acceptAnswer}>
        <i className="fa fa-check"></i>
      </button>;
      break;

    case false:
      button = <button className="btn btn-danger">
        <i className="fa fa-times"></i>
      </button>;
      break;

    default:
      button = <button onClick={props.checkAnswer} disabled={props.selectedNumbers.length === 0}>  =
</button>;
      break;
  }
  return (
    <div className="col-2 text-center">
      {button}
      <br /> <br />
      <button className="btn btn-warning" disabled={props.redraws === 0} onClick={
        props.redraw
      }>
        <i class="fa fa-angle-right">{props.redraws}</i>

      </button>

    </div>
  );
}

const Answer = (props) => {
  return (
    <div className="col-5">
      {props.selectedNumbers.map((number, i) =>
        <span onClick={() => props.unselectNumber(number)}
          key={i}>{number}</span>
      )}
    </div>
  );
}

const Numbers = (props) => {
  //const arrayOfNumbers= _.range(1,10);
  const numberClassName = (number) => {
    if (props.usedNumbers.indexOf(number) >= 0)
      return 'used';
    if (props.selectedNumbers.indexOf(number) >= 0)
      return 'selected';
  }
  return (
    <div className="card text-center">
      <div>
        {Numbers.arrayOfNumbers.map((number, i) =>
          <span key={i} className={numberClassName(number)}
            onClick={() => {
              if (props.usedNumbers.indexOf(number) >= 0)
                return;

              if (props.selectedNumbers.indexOf(number) === -1) {
                props.selectNumber(number)
              }
            }

            }
          >{number}</span>
        )}
      </div>
    </div>
  );
}

const DoneFrame = (props) => {
  return (
    <div className="text-center">
      <h2> {props.doneStatus} </h2>
      <button className="btn btn-secondary" onClick={props.resetGame}>Play again</button>
    </div>
  );
}


Numbers.arrayOfNumbers = _.range(1, 10);

class Game extends React.Component {
  //static randomNumber = ()=>
  static initialState = () => ({
    usedNumbers: [],
    selectedNumbers: [],
    randomNumberOfStars: 1 + Math.floor(Math.random() * 9),
    answerIsCorrect: null,
    redraws: 5,
    doneStatus: null

  });


  state = Game.initialState();

  resetGame = () => this.setState(Game.initialState());

  selectNumber = (clickedNumber) => {
    this.setState((prevState) => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    })
    );


  }
  unselectNumber = (clickedNumber) => {
    this.setState((prevState) => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.filter(
        number => number !== clickedNumber
      )
    })
    );
  }
  checkAnswer = () => {
    this.setState((prevState) => ({

      answerIsCorrect: prevState.randomNumberOfStars ===
        prevState.selectedNumbers.reduce((acc, n) => acc + n)
    }));
  }
  acceptAnswer = () => {
    this.setState((prevState) => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
      randomNumberOfStars: 1 + Math.floor(Math.random() * 9)

    }), this.updateDoneStatus);
  }
  redraw = () => {
    if (this.state.redraws === 0) { return; }
    this.setState((prevState) => ({
      selectedNumbers: [],
      answerIsCorrect: null,
      randomNumberOfStars: 1 + Math.floor(Math.random() * 9),
      redraws: prevState.redraws - 1
    }), this.updateDoneStatus);
  }
  possibleSolutions = ({ randomNumberOfStars, usedNumbers }) => {
    const possibleNumbers = _.range(1, 10).filter(number => usedNumbers.indexOf(number) === -1);

    return possibleCombinationSum(possibleNumbers, randomNumberOfStars);
  };

  updateDoneStatus = () => {

    this.setState((prevState) => {
      if (prevState.usedNumbers.length === 9) {
        return { doneStatus: 'Done. Nice !' };
      }

      var possibleCombinationSum = function (arr, n) {
        if (arr.indexOf(n) >= 0) { return true; }
        if (arr[0] > n) { return false; }
        if (arr[arr.length - 1] > n) {
          arr.pop();
          return possibleCombinationSum(arr, n);
        }
        var listSize = arr.length, combinationsCount = (1 << listSize)
        for (var i = 1; i < combinationsCount; i++) {
          var combinationSum = 0;
          for (var j = 0; j < listSize; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
          }
          if (n === combinationSum) { return true; }
        }
        return false;
      };

      if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {

        return { doneStatus: 'Game Over!' };
      }
    });

  }


  render() {
    const { selectedNumbers, randomNumberOfStars, answerIsCorrect, usedNumbers, redraws, doneStatus } = this.state;
    return (
      <div className="container">
        <h1> Play Nine </h1>
        <hr />
        <div className="row">
          <Stars numberOfStars={randomNumberOfStars} />
          <Button selectedNumbers={selectedNumbers}
            checkAnswer={this.checkAnswer}
            answerIsCorrect={answerIsCorrect}
            acceptAnswer={this.acceptAnswer}
            redraw={this.redraw}
            redraws={redraws}
          />
          <Answer selectedNumbers={selectedNumbers}
            unselectNumber={this.unselectNumber}
          />
        </div>
        <br />
        {doneStatus ? <DoneFrame resetGame={this.resetGame} doneStatus={doneStatus} /> : <Numbers selectedNumbers={selectedNumbers}
          selectNumber={this.selectNumber}
          usedNumbers={usedNumbers}
        />}

        <br />


      </div>
    );
  }

}
