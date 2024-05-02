import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;

  /*      
  In this if statement, it checks if the length of prevTurns is greater than 0 (meaning there are previous turns) and if the first turn's player was "X." If this condition is true, it sets currentPlayer to "O," indicating that the next turn should be made by player "O."

  Now, if the previous player was "O," the condition prevTurns[0].player === "X" would be false, and the code would not enter the if block. In that case, the default value of currentPlayer ("X") is maintained.
  */
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  // We created a copy of the original gameBoard array so that we can reset the gameTurns array when we click on the rematch button.

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}
export default function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);

  /*
  for (const turn of turns) {: This initiates a loop over each turn in the turns array. For each iteration, the loop extracts the turn into the variable turn.

  const { square, player } = turn;: This uses destructuring to extract the square and player properties from the turn object. Each turn object in the turns array is expected to have a structure like { square: { row, col }, player }.

  const { row, col } = square;: This further destructures the square object to obtain the row and col values. This assumes that each square object has properties row and col.

  gameBoard[row][col] = player;: This line updates the gameBoard array based on the information from the current turn. It sets the value at the specified row and col in the gameBoard array to the player who made the move. This effectively marks the square with the player's symbol.

  The specific targeted values that were extracted using destructuring are row, col, and player. Let's break down how these values are used:

  Targeted Values:
  row: Represents the row index of the selected square.
  col: Represents the column index of the selected square.
  player: Represents the player symbol ('X' or 'O') making the move.

  How These Values Are Used:
  gameBoard[row][col] = player;: This line updates the gameBoard array to reflect the move made by the player. The player's symbol (player) is placed in the specified square at coordinates (row, col).
  */

  // Game draw
  const hasDraw = gameTurns.length === 9 && !winner;

  // Logic for switching turns between players
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      // NB: prevTurns is an array that was declared in the useState hook. It refers to any previous turn we want to consider.

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      /*
      This part of the code is responsible for creating a new array updatedTurns that represents the updated list of turns in the game. Let's break it down:

      javascript
      Copy code
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      { square: { row: rowIndex, col: colIndex }, player: currentPlayer }: This part creates a new turn object. It represents the latest move in the game. It includes information about the selected square, with the rowIndex and colIndex indicating the row and column of the square, and the player indicating the player making the move (currentPlayer).

      ...prevTurns: This is the spread operator (...). It is used to include all the elements of the prevTurns array in the new updatedTurns array. This ensures that the new turn is added at the beginning of the list, maintaining the order of previous turns.
      */

      return updatedTurns;
    });
  }

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <header>
        <h1>Tic-Tac-Toe</h1>
      </header>
      <div id="game-container">
        {/* PLayer names and symbols */}
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>

        {/* Winner message */}
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRematch={handleRematch} />
        )}

        {/* Game board */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>

      {/* Log */}
      <Log turns={gameTurns} />
    </main>
  );
}
