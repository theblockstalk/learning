import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button
      className="square"
      onClick={ props.onClick }>
      {props.value}
    </button>
  );
}


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

class Board extends React.Component {
  renderSquare(i) {
    const line = this.props.line;
    if (line && line.includes(i))
      return <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        />;
    else
      return <Square className="win"
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        />;
  }

  renderRow(row) {
    let squares = [];
    for (let i=0; i<3; i++)
      squares.push(this.renderSquare(3*row+i));
    
    return (
      <div className="board-row">
        {squares}
      </div>
    )
  }

  render() {
    let rows = [];
    for (let i=0; i<3; i++)
      rows.push(this.renderRow(i));
    
    return (
      <div>
        {rows}
      </div>
    );
  }
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

    const moves = history.map((step, move) => {
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

    let status;
    if (winner.winner) {
      status = "Winner: " + winner.winner;
    }
    else
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            lines={winner.line}
            onClick={(i) => this.handleClick(i)}
        />
        </div>
        <div className="game-info">
          <div>{ status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
