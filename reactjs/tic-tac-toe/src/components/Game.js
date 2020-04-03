import React from 'react';
import Board from './Board'

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {
          winner: squares[a],
          line: lines[i],
        }
      }
    }
    return {winner:null};
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
          move: {
            col: null,
            row: null,
            by: null
          }
        }],
        xIsNext: true,
        stepNumber: 0,
        ascOrder: true
      }
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber+1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      
      if (calculateWinner(squares).winner || squares[i]) return;
      
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      
      this.setState({
        history: history.concat([{
          squares: squares,
          move: {
            col: i % 3,
            row: Math.floor(i / 3),
            by: this.state.xIsNext ? 'X' : 'O'
          }
        }]),
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length,
      });
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      })
    }
  
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      
      function renderButton(move, desc, stepNumber) {
        if (move === stepNumber) {
          return (
            <b>{desc}</b>
          )
        } else {
          return desc
        }
      }
  
      let moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move + ' (' + step.move.row + ', ' + step.move.col + ')':
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>
              {renderButton(move, desc, this.state.stepNumber)}
            </button>
          </li>
        )
      })
      
      if (!this.state.ascOrder) {
        moves = moves.sort((a, b) =>  a.key < b.key)
      }
      
      let status;
      if (winner.winner) {
        status = "Winner: " + winner.winner;
      }
      else if (this.state.stepNumber===9)
        status = "Draw"
      else
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      
      let thisObj = this;
      function asc() {
        let state = thisObj.state;
        state.ascOrder=true;
        thisObj.setState(state);
      }
  
      function desc() {
        let state = thisObj.state;
        state.ascOrder=false;
        thisObj.setState(state);
      }
      
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              line={winner.line}
              onClick={(i) => this.handleClick(i)}
          />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
            <div>Sort <a onClick={asc}><u>asc</u></a> / <a onClick={desc}><u>desc</u></a></div>
          </div>
        </div>
      );
    }
  }

export default Game;