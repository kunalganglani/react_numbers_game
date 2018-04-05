import React from 'react';
import _ from 'lodash';

export const Stars = (props) => {
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

export const Button = (props) => {
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
                <i className="fa fa-angle-right">{props.redraws}</i>

            </button>

        </div>
    );
}

export const Answer = (props) => {
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
Numbers.arrayOfNumbers = _.range(1, 10);

export default Numbers;
export const DoneFrame = (props) => {
    return (
        <div className="text-center">
            <h2> {props.doneStatus} </h2>
            <button className="btn btn-secondary" onClick={props.resetGame}>Play again</button>
        </div>
    );
}
