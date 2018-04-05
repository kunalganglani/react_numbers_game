import _ from 'lodash';
import {possibleCombinationSum} from './possibleCombinations';
import React from 'react';
import  Numbers, { Stars, Button, Answer, DoneFrame} from './GameElements';

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

export default Game;

