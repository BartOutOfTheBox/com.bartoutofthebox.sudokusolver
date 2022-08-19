import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import { solveSudoku } from './sudoku';

class Square extends React.Component {
    render() {
      return (
        <td className="square">
          <input type="text" 
            onChange={(event) => this.props.onChange(event)}
            value={this.props.value} >
          </input>
        </td>
      );
    }
  }
  
  class Board extends React.Component {
    renderSquare(i, j) {
      return (
        <Square
          onChange={(event) => this.props.onChange(event, i, j)}
          value={this.props.squares(i, j)} />
      );
    }

    renderRow(i) {
        return (
            <tr className="board-row">
                {this.renderSquare(i, 0)}
                {this.renderSquare(i, 1)}
                {this.renderSquare(i, 2)}
                {this.renderSquare(i, 3)}
                {this.renderSquare(i, 4)}
                {this.renderSquare(i, 5)}
                {this.renderSquare(i, 6)}
                {this.renderSquare(i, 7)}
                {this.renderSquare(i, 8)}
            </tr>
        );
    }
  
    render() {
      const status = 'New sudoku ^^';
  
      return (
        <div>
          <div className="status">{status}</div>
          <table className="sudoku">
            <tbody>
                {this.renderRow(0)}
                {this.renderRow(1)}
                {this.renderRow(2)}
                {this.renderRow(3)}
                {this.renderRow(4)}
                {this.renderRow(5)}
                {this.renderRow(6)}
                {this.renderRow(7)}
                {this.renderRow(8)}
            </tbody>
            
          </table>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // squares: Array(9).fill(Array(9).fill('')),
            squares: [
                ["5","3","","","7","","","",""],
                ["6","","","1","9","5","","",""],
                ["","9","8","","","","","6",""],
                ["8","","","","6","","","","3"],
                ["4","","","8","","3","","","1"],
                ["7","","","","2","","","","6"],
                ["","6","","","","","2","8",""],
                ["","","","4","1","9","","","5"],
                ["","","","","8","","","7","9"]],
        }
    }

    handleSolve() {
        const squares = this.state.squares;
        var hasSolution = solveSudoku(squares);
        console.log(`solved? ${hasSolution ? 'hell yeah!' : 'nahhh'}`);
        this.setState({squares: squares});
    }

    handleInput(event, i, j) {
        const rows = this.state.squares.slice();
        const squares = rows[i].slice();
        squares[j] = event.target.value;
        rows[i] = squares;
        this.setState({squares: rows});
    }
    
    handleReset() {
        this.setState({squares: Array(9).fill(Array(9).fill(''))});
    }
    
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={(i, j) => this.state.squares[i][j]}
              onChange={(event, i, j) => this.handleInput(event, i, j)}/>
          </div>
          <div className="game-controls">
            <div>
              <button className="solve-button" 
                onClick={() => this.handleSolve()}>
                  Solve!
              </button>
              <button className="reset-button" 
                onClick={() => this.handleReset()}>
                  Reset!
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  