import React from "react";
import Square from "./Square";
export default function Row({ row, handleClick }) {
  // console.log(row);
  const set = row.map((square, index) => (
    <Square
      handleClick={handleClick}
      column={index}
      value={square}
      key={index}
    />
  ));

  return <div className="Row">{set}</div>;
}
