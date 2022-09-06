import React from "react";

import { solveSudoku } from "../logic/sudoku";
import "./Sudoku.css";

class Square extends React.Component {
  render() {
    return (
      <td className="square">
        <input
          type="text"
          onChange={(event) => this.props.onChange(event)}
          value={this.props.value}
        ></input>
      </td>
    );
  }
}

class Board extends React.Component {
  renderSquare(i, j) {
    return (
      <Square
        onChange={(event) => this.props.onChange(event, i, j)}
        value={this.props.squares(i, j)}
        key={j}
      />
    );
  }

  renderRow(i) {
    const squares = Array.from(Array(9).keys());
    return (
      <tr className="board-row" key={i}>
        {squares.map((sq) => this.renderSquare(i, sq))}
      </tr>
    );
  }

  render() {
    const status = "New sudoku ^^";
    const rows = Array.from(Array(9).keys());

    return (
      <div>
        <div className="status">{status}</div>
        <table className="sudoku">
          <tbody>{rows.map((row) => this.renderRow(row))}</tbody>
        </table>
      </div>
    );
  }
}

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // squares: Array(9).fill(Array(9).fill('')),
      squares: [
        ["5", "3", "", "", "7", "", "", "", ""],
        ["6", "", "", "1", "9", "5", "", "", ""],
        ["", "9", "8", "", "", "", "", "6", ""],
        ["8", "", "", "", "6", "", "", "", "3"],
        ["4", "", "", "8", "", "3", "", "", "1"],
        ["7", "", "", "", "2", "", "", "", "6"],
        ["", "6", "", "", "", "", "2", "8", ""],
        ["", "", "", "4", "1", "9", "", "", "5"],
        ["", "", "", "", "8", "", "", "7", "9"],
      ],
    };
  }

  handleSolve() {
    const squares = this.state.squares;
    var hasSolution = solveSudoku(squares);
    console.log(`solved? ${hasSolution ? "hell yeah!" : "nahhh"}`);
    this.setState({ squares: squares });
  }

  handleInput(event, i, j) {
    const rows = this.state.squares.slice();
    const squares = rows[i].slice();
    squares[j] = event.target.value;
    rows[i] = squares;
    this.setState({ squares: rows });
  }

  handleReset() {
    this.setState({ squares: Array(9).fill(Array(9).fill("")) });
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={(i, j) => this.state.squares[i][j]}
            onChange={(event, i, j) => this.handleInput(event, i, j)}
          />
        </div>
        <div className="game-controls">
          <div>
            <button className="solve-button" onClick={() => this.handleSolve()}>
              Solve!
            </button>
            <button className="reset-button" onClick={() => this.handleReset()}>
              Reset!
            </button>
          </div>
        </div>
      </div>
    );
  }
}
