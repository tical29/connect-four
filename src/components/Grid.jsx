import React, { useState, useRef, useEffect } from "react";
import { Navbar, Col, Container } from "react-bootstrap";
import Row from "./Row";

const URL = "wss://connect-four-jp.herokuapp.com";

export default function Grid() {
  const [currentPlayer, setPlayer] = useState("X");
  const [grid, setGrid] = useState(new Array(6).fill(new Array(6).fill("")));
  const [winner, setWinner] = useState("");

  const webSocket = useRef(null);

  useEffect(() => {
    webSocket.current = new WebSocket(URL);

    webSocket.current.onopen = (data) => {
      console.log(data);
    };

    webSocket.current.onmessage = ({ data }) => {
      const parsedData = JSON.parse(data);
      const { winner, grid } = parsedData;

      if (winner) {
        setWinner(winner);
      }

      if (grid) setGrid(grid);
    };
    return () => webSocket.current.close();
  }, []);

  function handleMove(column) {
    webSocket.current.send(JSON.stringify({ column, currentPlayer, grid }));
  }

  const rows = grid.map((row, index) => (
    <Row key={index} row={row} handleClick={handleMove} />
  ));

  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Connect Four with Raluca</Navbar.Brand>
      </Navbar>

      <Col className="justify-content-md-center">{rows}</Col>
      {winner && `Winner is: ${winner}`}
    </Container>
  );
}
