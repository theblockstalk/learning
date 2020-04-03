import React from 'react';
import Square from './Square'

class Board extends React.Component {
    renderSquare(i) {
      const line = this.props.line;
      return <Square
        win={line && line.includes(i)}
        // win={i===3}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        />;
    }
  
    renderRow(row) {
      let cols = [];
      for (let i=0; i<3; i++)
      cols.push(this.renderSquare(3*row+i));
      
      return (
        <div className="board-row">
          {cols}
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

export default Board;