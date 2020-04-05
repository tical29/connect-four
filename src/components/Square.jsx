import React from "react";
export default function ({ value, handleClick, column }) {
  return (
    <div className="Square" onClick={() => handleClick(column)}>
      {value}
    </div>
  );
}
