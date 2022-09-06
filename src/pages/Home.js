import React from "react";

import Game from "../components/Sudoku";
import "./Home.css";

function Header(props) {
  return (
    <div id="header">
      <h1>header</h1>
    </div>
  );
}

function Footer(props) {
  return (
    <div id="footer">
      <h1>footer</h1>
    </div>
  );
}

export default function Home(props) {
  return (
    <>
      <Header />
      <Game />
      <Footer />
    </>
  );
}
