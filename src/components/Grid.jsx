import React, { useState } from "react";
import Row from "./Row";

export default function Grid() {
  const [currentPlayer, setPlayer] = useState("X");
  const [grid, setGrid] = useState(new Array(6).fill(new Array(6).fill("")));
  const [winner, setWinner] = useState("");

  function handleMove(column) {
    const reversedGrid = [...grid.reverse()];

    for (let i = 0; i < reversedGrid.length; i++) {
      const temp = [...reversedGrid[i]];
      if (temp[column] === "") {
        temp[column] = currentPlayer;
        setPlayer(currentPlayer === "X" ? "O" : "X");
        reversedGrid.splice(i, 1, temp);
        break;
      }
    }

    const updatedGrid = reversedGrid.reverse();
    setGrid(updatedGrid);
    setWinner(checkForWin(updatedGrid));
  }

  function checkForWin(grid) {
    const horizontalWinner = checkHorizontal(grid);
    const verticalWinner = checkVertical(grid);
    if (horizontalWinner !== null) {
      return horizontalWinner;
    } else if (verticalWinner !== null) {
      return verticalWinner;
    }
  }

  function checkHorizontal(grid) {
    for (let row of grid) {
      let count = 1;
      let current;
      for (let i = 1; i < row.length; i++) {
        if (row[i] === current && current !== "") {
          count++;
        } else {
          count = 1;
          current = row[i];
        }
        if (count === 4) {
          return current;
        }
      }
    }
    return null;
  }

  function checkVertical(grid) {
    const columns = [];
    for (let i = 0; i < grid.length; i++) {
      let column = [];
      for (let x = 0; x < grid.length; x++) {
        column.push(grid[x][i]);
      }
      columns.push(column);
    }
    return checkHorizontal(columns);
  }

  const rows = grid.map((row, index) => (
    <Row key={index} row={row} handleClick={handleMove} />
  ));

  return (
    <div>
      {rows}
      {winner && `Winner is: ${winner}`}
    </div>
  );
}
